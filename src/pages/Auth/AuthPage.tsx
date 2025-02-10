import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordCredentials } from "../../api/api";
import { PasswordSignInRequest, PasswordSignInResponse } from "../../types";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
//import Input from "../../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../routes";
import { StyledAuthPage } from "./Auth.styled";
// import Button from "../../components/Button";
// import packageJson from "../../../package.json";
import WelcomeHeader from "./WelcomeHeader/WelcomeHeader";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { LoadingSpinner } from "../../styles/loadingSpinner";

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [networkError, setNetworkError]=useState<string>("")
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : routes.ROOT;

  const signInWithCredentialsMutation = useMutation<
    PasswordSignInResponse,
    any,
    PasswordSignInRequest
  >({
    mutationFn: sendPasswordCredentials,
  });

  const handleSignIn = () => {
    if (!username || !password) return;

    signInWithCredentialsMutation.mutate(
      { username, password },
      {
        onSuccess: (response) => {
          localStorage.setItem("accessToken", response.accessToken);
          navigate(from);
        },
        onError: (error) => {
          if(error.code === "ERR_NETWORK"){
            setNetworkError(error.message + ": Check your internet connection")
          }
          console.error("Sign-in failed", error.message);
        },
      }
    );
  };

  return (
    <StyledAuthPage>
      <WelcomeHeader />
      <div className="loginBox">
        {/* <div className="promptMsg">Enter username and password to sign in.</div> */}
        <div className="controlsContainer">
          <div className="mailbox">
            <Input
              inputMode="text"
              value={username}
              //error={signInError ? true : false}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              value={password}
              //error={signInError ? true : false}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <div className="mailmsg">{signInError}&nbsp;</div> */}
          </div>
          {signInWithCredentialsMutation.status !== "pending" && (
            <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
          )}

          {signInWithCredentialsMutation.status == "pending" && (
            <SubmitButton>
              <LoadingSpinner name="sync" fontSize={18} />
            </SubmitButton>
          )}

          <div className="mailmsg">{networkError}</div>
          <div className="or ">OR</div>
          <GoogleButton />
          <div className="mailmsg">{networkError}</div>
        </div>
      </div>
    </StyledAuthPage>
  );
};

export default AuthPage;
