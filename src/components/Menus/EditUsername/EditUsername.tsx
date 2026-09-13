import { useEffect, useState } from 'react';
import { StyledEditUsername } from './EditUsername.styled';
import MyButton from '../../MyButton/MyButton';
import { useGetUsernameStatus } from '../../../api/auth/QueryHooks/useGetUsernameStatus';
import { EditUsernameProps } from '../../../interfaces';
import { useEditUsername } from '../../../api/auth/CommandHooks/useEditUsername';
import Spinner from '../../Spinner/Spinner';
import { GrFormCheckmark } from 'react-icons/gr';
import { FiAlertTriangle } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

export default function EditUsername({
  existingUsername,
  editUsernameMenu,
}: EditUsernameProps) {
  const [username, setUsername] = useState(existingUsername);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const params = useParams();
  const groupId = params?.groupid;

  const usernameStatus = useGetUsernameStatus(username);

  const { mutate: editUsername, isPending } = useEditUsername(groupId);

  useEffect(() => {
    if (!usernameStatus.isSuccess) {
      return;
    }

    if (!usernameStatus.data.isValid) {
      setErrorMessage(usernameStatus.data.errorMessage!);
      return;
    }

    if (!usernameStatus.data.isAvailable) {
      setErrorMessage('Already taken');
      return;
    }

    setErrorMessage(undefined);
  }, [usernameStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setUsername(e.target.value);
  };

  const handleConfirm = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    editUsername(username || '', {
      onSuccess: () => {
        editUsernameMenu.value = null;
      },
    });
  };

  return (
    <StyledEditUsername>
      <div className="dialogTitle">Change username</div>
      <div className="headerSeparator">
        <div className="header">
          <input
            placeholder="Select username"
            className="input"
            value={username}
            onChange={handleInputChange}
            autoFocus={true}
          />
          {username &&
            username.length > 0 &&
            (!usernameStatus.isSuccess ? (
              <Spinner fontSize={'16px'} />
            ) : !errorMessage ? (
              <GrFormCheckmark className="checkmark" />
            ) : (
              <FiAlertTriangle className="warning" />
            ))}
        </div>
      </div>
      <div className="fieldNote">
        Others see this name in every group you share. 3–20 characters.
      </div>
      <div className="username-status">{errorMessage ?? '\xa0'}</div>
      <div className="buttons">
        <MyButton isLoading={isPending} onClick={handleConfirm}>
          Save
        </MyButton>
        <MyButton
          variant="secondary"
          onClick={() => (editUsernameMenu.value = null)}
        >
          Cancel
        </MyButton>
      </div>
    </StyledEditUsername>
  );
}
