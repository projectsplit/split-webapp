import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PasswordSignInRequest, PasswordSignInResponse } from "../../types";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../routes";
import { StyledAuthPage } from "./Auth.styled";
import WelcomeHeader from "./WelcomeHeader/WelcomeHeader";
import Input from "../../components/Input/Input";
import { sendPasswordCredentials } from "../../api/auth/api";
import MyButton from "../../components/MyButton/MyButton";

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [networkError, setNetworkError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirect =
    new URLSearchParams(location.search).get("redirect") || routes.ROOT;

  const { mutate: signInWithCredentialsMutation, isPending } = useMutation<
    PasswordSignInResponse,
    any,
    PasswordSignInRequest
  >({
    mutationFn: sendPasswordCredentials,
  });

  const handleSignIn = () => {
    if (!username || !password) return;
    setNetworkError("");

    signInWithCredentialsMutation(
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
          <div className="inputBox">
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

          <div className="createAccountSignIn">
            <MyButton
              onClick={handleSignIn}
              fontSize="18"
              isLoading={isPending}
            >
              Sign In
            </MyButton>
              <MyButton
              onClick={()=>navigate('/entry')}
              fontSize="18"
            >
              Create Account
            </MyButton>
          </div>

          <div className="errormsg">{networkError}</div>
          <div className="or ">OR</div>
          <GoogleButton />
          <div className="errormsg">{networkError}</div>
        </div>
      </div>
    </StyledAuthPage>
  );
};

export default AuthPage;
