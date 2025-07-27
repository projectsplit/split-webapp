import React, { useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import routes from "../routes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendGoogleAccessToken } from "../api/auth/api";
import Spinner from "../components/Spinner/Spinner";

const GoogleCallback: React.FC = () => {
    
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const mutation = useMutation({
    mutationFn: sendGoogleAccessToken,
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      navigate(routes.ROOT, { replace: true });
    },
    onError: () => {
      navigate(routes.ROOT, { replace: true });
    },
  });

  const handleAuthCode = useCallback(() => {
    const code = searchParams.get("code");
    if (code && mutation.isIdle) {
      mutation.mutate({ code });
      setSearchParams({}, { replace: true });
    }
  }, [mutation, searchParams, setSearchParams]);

  useEffect(() => {
    handleAuthCode();
  }, [handleAuthCode]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {mutation.isPending && <Spinner />}
      {mutation.isSuccess && (
        <div>
          <h1>Login successful!</h1>
          <button onClick={() => (window.location.href = routes.ROOT)}>
            Go to Home
          </button>
        </div>
      )}
      {mutation.isError && (
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
