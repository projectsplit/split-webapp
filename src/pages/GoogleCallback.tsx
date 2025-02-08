import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendGoogleAccessToken } from "../api/api";
import routes from "../routes";
import { SendGoogleAccessTokenRequest, SendGoogleAccessTokenResponse } from "../types";
import { useNavigate } from "react-router-dom";

const GoogleCallback: React.FC = () => {
  
  const navigate = useNavigate();
  
  const mutation = useMutation<SendGoogleAccessTokenResponse, Error, SendGoogleAccessTokenRequest>({
    mutationFn: sendGoogleAccessToken,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken)
      navigate(routes.ROOT)
    }
  });
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const googleAccessToken = params.get("access_token");

    if (googleAccessToken && mutation.status === "idle") {
      mutation.mutate({ googleAccessToken});
    }
    
  }, [mutation]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {mutation.status === "pending" && <h1>Processing...</h1>}
      {mutation.status === "success" && (
        <div>
          <h1>Login successful!</h1>
          <button onClick={() => window.location.href = routes.ROOT}>Go to Home</button>
        </div>
      )}
      {mutation.status === "error" && (
        <div>
          <h1>Login failed. Please try again.</h1>
          <button onClick={() => window.location.href = routes.ROOT}>Back to Login</button>
        </div>
      )}
    </div>
  );
};

export default GoogleCallback;
