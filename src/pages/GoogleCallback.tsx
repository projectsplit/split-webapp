import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import routes from "../routes";
import { SendGoogleCodeRequest, SendGoogleAccessTokenResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { sendGoogleAccessToken } from "../api/auth/api";
import Spinner from "../components/Spinner/Spinner";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation<
    SendGoogleAccessTokenResponse,
    Error,
    SendGoogleCodeRequest
  >({
    mutationFn: sendGoogleAccessToken,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      navigate(routes.ROOT);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code && mutation.status === "idle") {
      mutation.mutate({ code });
    }
  }, [mutation]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {mutation.status === "pending" && <Spinner />}
      {mutation.status === "success" && (
        <div>
          <h1>Login successful!</h1>
          <button onClick={() => (window.location.href = routes.ROOT)}>
            Go to Home
          </button>
        </div>
      )}
      {mutation.status === "error" && (
        <div>
          <h1>Login failed. Please try again.</h1>
          <button onClick={() => (window.location.href = routes.ROOT)}>
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleCallback;
