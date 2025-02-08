import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordCredentials } from "../../api/api";
import { PasswordSignInRequest, PasswordSignInResponse } from "../../types";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import Input from "../../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../routes";
import { StyledAuthPage } from "./Auth.styled";
import Button from "../../components/Button";
import packageJson from "../../../package.json";

const AuthPage
: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const location = useLocation();

  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : routes.ROOT;

  const signInWithCredentialsMutation = useMutation<PasswordSignInResponse, Error, PasswordSignInRequest>({
    mutationFn: sendPasswordCredentials,
  });

  const handleSignIn = () => {
    if (!username || !password) return;

    signInWithCredentialsMutation.mutate({ username, password }, {
      onSuccess: (response) => {
        localStorage.setItem("accessToken", response.accessToken);
        navigate(from)
      },
      onError: (error) => {
        console.error("Sign-in failed", error);
      },
    });
  };

  return (
    <StyledAuthPage >
      <Input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username" />
      <Input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password" />
      <Button onClick={handleSignIn} disabled={signInWithCredentialsMutation.status === "success"}>
        {signInWithCredentialsMutation.isPending ? "Signing In..." : "Sign In"}
      </Button>
      <hr />
      <GoogleButton />
      <div>Version: {packageJson.version}</div>
    </StyledAuthPage>
  );
};

export default AuthPage
;
