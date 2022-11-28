import React, { useState, useEffect } from "react";
import { TextField, Button,FormControl} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://635bb7bb8aa87edd914f5708.mockapi.io/register")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, [email1,password1]);

  var data1 = data.find(function (item) {
    if (item.email === email1 && item.password === password1) {
      return true;
    } else {
      return false;
    }
  });

  const loggedIn = (e) => {
    if (email1===""&& password1==="") {
        alert("Fill The Information")      
    } else {
      if (data1) {
        navigate('/Home')
        alert("Success");
      } else {
        alert("Invalid User");
      }
      setEmail1("");
      setPassword1("");
    }
    e.preventDefault();
  };

  return (
    <div className="container">
      <FormControl className="box">
      <h1>Login</h1>
      
      <TextField
        sx={{ marginBottom: 2 }}
        id="email1"
        type="email"
        label="Email"
        autoComplete="off"
        variant="standard"
        value={email1}
        onChange={(e) => setEmail1(e.target.value)}
      ></TextField>
      <TextField
        sx={{ marginBottom: 2 }}
        id="password1"
        type="password"
        label="Password"
        variant="standard"
        autoComplete="off"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      ></TextField>
      <Button variant="contained" type="submit" onClick={loggedIn}>
        Log In
      </Button>
      </FormControl>
    </div>
  );
}
