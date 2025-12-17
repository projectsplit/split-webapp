import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

import routes from "../routes";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getUserId } from "../api/services/api";
import { logOut } from "../api/auth/api";

const About: React.FC = () => {

  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["getUserId"],
    queryFn: getUserId,
  });

  const logOutMutation = useMutation<any, Error, void>({
    mutationFn: logOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("nonGroupExpenseData");
      navigate(routes.AUTH)
    },
    onError: (error) => {
      console.error("Log out failed:", error.message);
    },
  });
  
  return (
    <div>
      <p>{isLoading ? "Loading...": "Loaded!"}</p>
      <p>{error ? error.message : "No error"}</p>
      <p>{data?.userId ? `Your user ID is: ${data.userId}` : "No user ID found."}</p>
      <Button disabled={false} onClick={() => logOutMutation.mutate()}>
        Log Out
      </Button>
    </div>
  );
};

export default About;
