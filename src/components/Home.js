import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const logout = (e) => {
    navigate("/");
  };
  return (
    <div className="container">
      <h1>Login Succesfully</h1>
      <Button variant="contained" type="submit" onClick={logout}>
        Log Out
      </Button>
    </div>
  );
}
