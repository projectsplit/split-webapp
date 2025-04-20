import { useEffect, useState } from "react";
import { StyledEditUsername } from "./EditUsername.styled";
import MyButton from "../../MyButton/MyButton";
import Separator from "../../Separator/Separator";
import { useGetUsernameStatus } from "../../../api/services/useGetUsernameStatus";
import { EditUsernameProps } from "../../../interfaces";
import { useEditUsername } from "../../../api/services/useEditUsername";
import Spinner from "../../Spinner/Spinner";
import { GrFormCheckmark } from "react-icons/gr";
import { FiAlertTriangle } from "react-icons/fi";

export default function EditUsername({ existingUsername, close }: EditUsernameProps) {

  const [username, setUsername] = useState(existingUsername)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const usernameStatus = useGetUsernameStatus(username)
  const editUsernameMutation = useEditUsername()

  useEffect(() => {
    if (!usernameStatus.isSuccess) {
      return
    }

    if (!usernameStatus.data.isValid) {
      setErrorMessage(usernameStatus.data.errorMessage!)
      return
    }

    if (!usernameStatus.data.isAvailable) {
      setErrorMessage("Already taken")
      return
    }

    setErrorMessage(undefined)

  }, [usernameStatus])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined)
    setUsername(e.target.value)
  }

  const handleConfirm = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    editUsernameMutation.mutate(
      username,
      {
        onSuccess: () => { close() }
      })
  }

  return (
    <StyledEditUsername>
      <div className="headerSeparator">
        <div className="header">
          <input
            placeholder="Select username"
            className="input"
            value={username}
            onChange={handleInputChange}
            autoFocus={true}
          />
          {username.length > 0 && (!usernameStatus.isSuccess ? <Spinner fontSize={"14px"} /> : !errorMessage ? <GrFormCheckmark /> : <FiAlertTriangle />)}
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
      <div className="username-status">{errorMessage ?? "\xa0"}</div>
      <div className="buttons">
        <MyButton isLoading={false} onClick={handleConfirm}>
          Confirm
        </MyButton>
        <MyButton variant="secondary" onClick={close}>
          Cancel
        </MyButton>
      </div>
    </StyledEditUsername>
  );
}
