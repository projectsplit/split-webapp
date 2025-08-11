import { useState } from "react";
import Input from "../../components/Input/Input";
import WelcomeHeader from "../Auth/WelcomeHeader/WelcomeHeader";
import { StyledCreateAccount } from "./CreateAccount.styled";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton/MyButton";
import { useMutation } from "@tanstack/react-query";
import { createPasswordCredentials } from "../../api/auth/api";
import { PasswordSignUpRequest, PasswordSignUpResponse } from "../../types";
import routes from "../../routes";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [networkError, setNetworkError] = useState<string>("");
  const [requestError, setRequestError] = useState<string>("");
  const navigate = useNavigate();

  const redirect =
    new URLSearchParams(location.search).get("redirect") || routes.ROOT;

  const { mutate: signUpWithCredentialsMutation, isPending } = useMutation<
    PasswordSignUpResponse,
    any,
    PasswordSignUpRequest
  >({
    mutationFn: createPasswordCredentials,
  });

  const handleSignUp = () => {
    if (!username || !password) return;
    setNetworkError("");

    signUpWithCredentialsMutation(
      { username, password },
      {
        onSuccess: (response) => {
          localStorage.setItem("accessToken", response.accessToken);
          navigate(redirect);
        },
        onError: (error) => {
          if (error.code === "ERR_NETWORK") {
            setNetworkError(error.message + ": Check your internet connection");
          }
          if ((error.code = "ERR_BAD_REQUEST")) {
            setRequestError(error.response.data);
          }

          console.error("Sign-up failed", error.message);
        },
      }
    );
  };

  return (
    <StyledCreateAccount>
      <WelcomeHeader />
      <div className="loginBox">
        <div className="promptMsg">Create a new account</div>
        <div className="controlsContainer">
          <div className="inputBox">
            <Input
              inputMode="text"
              value={username}
              error={requestError ? true : false}
              placeholder="New Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {requestError ? (
              <div className="errormsg">{requestError}&nbsp;</div>
            ) : (
              ""
            )}
          </div>
          <div className="inputBox">
            <Input
              type="password"
              value={password}
              //error={signInError ? true : false}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <div className="mailmsg">{signInError}&nbsp;</div> */}
          </div>

          <MyButton fontSize="18" onClick={handleSignUp}>
            Sign Up
          </MyButton>
          <div className="errormsg">{networkError}</div>
        </div>
      </div>
    </StyledCreateAccount>
  );
}
