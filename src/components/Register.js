import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { validPassword, validFullName, validUserName } from "./Regex";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");

  const [branch, setBranch] = useState("");
  const [gender, setGender] = useState("");

  const [username, setUserName] = useState("");
  const [userNameErr, setUserNameErr] = useState("");

  const [password, setPassword] = useState("");
  const [pwdErr, setPwdErr] = useState("");

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://635bb7bb8aa87edd914f5708.mockapi.io/register")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  var data1 = data.find(function (item) {
    if (item.email === email && item.password === password) {
      return true;
    } else {
      return false;
    }
  });

  const inputval = [
    fullName,
    branch,
    gender,
    username,
    email,
    password,
    isChecked,
  ];
  const inputdata = { username: username, email: email, password: password };

  const Branch = [
    "Information Technology",
    "Computer Engineering",
    "Mechinical Engineering",
  ];

  const getFullName = (e) => {
    let i = e.target.value;
    if (i === "") {
      setFullNameErr(false);
    } else {
      if (!validFullName.test(fullName)) {
        setFullNameErr(true);
      } else {
        setFullNameErr(false);
      }
    }
    setFullName(i);
  };

  const getUserName = (e) => {
    let i = e.target.value;
    if (i === "") {
      setUserNameErr(false);
    } else {
      if (!validUserName.test(username)) {
        setUserNameErr(true);
      } else {
        setUserNameErr(false);
      }
    }
    setUserName(i);
  };

  const getPwd = (e) => {
    let i = e.target.value;
    if (i === "") {
      setPwdErr(false);
    } else {
      if (!validPassword.test(String(password))) {
        setPwdErr(true);
      } else {
        setPwdErr(false);
      }
    }
    setPassword(i);
  };

  const getEmail = (e) => {
    let i = e.target.value;
    setEmail(i);
  };

  const getCheckboxValue = (e) => {
    if (!isChecked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setIsChecked(e.target.checked);
  };
  const submitted = (e) => {
    if (
      fullName === "" ||
      username === "" ||
      branch === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      pwdErr === true ||
      userNameErr === true ||
      fullNameErr === true
    ) {
      setDisabled(true);
    } else {
      if (data1) {
        alert("User Already Exists...!!");
        setBranch("");
        setDisabled(true);
        setIsChecked(false);
        setEmailErr(false);
        setPwdErr(false);
        setFullNameErr(false);
        setUserNameErr(false);
        setEmail("");
        setFullName("");
        setGender("");
        setPassword("");
        setUserName("");
      } else {
        setDisabled(false);
        fetch("https://635bb7bb8aa87edd914f5708.mockapi.io/register", {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputdata),
        }).then((res) => {
          console.log(res);
        });
        console.log(inputval);
        navigate("/login");
      }
    }

    e.preventDefault();
  };
  return (
    <>
      <div className="container">
        <form className="Register" onSubmit={submitted} autoComplete="false">
          <FormControl className="box">
            <h1>Sign up</h1>

            <TextField
              sx={{ marginBottom: 2 }}
              id="fullName"
              label="Full Name"
              autoComplete="off"
              variant="standard"
              value={fullName}
              onChange={getFullName}
            ></TextField>
            {fullNameErr ? (
              <span
                style={{
                  color: "red",
                }}
              >
                Invalid Name
              </span>
            ) : null}
            <br />

            <Autocomplete
              disablePortal
              disableClearable
              id="combo-box-demo"
              options={Branch}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              value={branch}
              onChange={(e, v) => {
                setBranch(v);
              }}
              sx={{ width: 200, marginBottom: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="select a branch" required />
              )}
            />

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{ marginBottom: 2 }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              id="username"
              label="username"
              autoComplete="off"
              variant="standard"
              sx={{ marginBottom: 2 }}
              value={username}
              onChange={getUserName}
            ></TextField>
            {userNameErr ? (
              <span
                style={{
                  color: "red",
                }}
              >
                Invalid username
              </span>
            ) : null}

            <TextField
              id="email"
              label="EmailId"
              variant="standard"
              autoComplete="off"
              type="email"
              sx={{ marginBottom: 2 }}
              value={email}
              onChange={getEmail}
            ></TextField>
            {emailErr ? (
              <span
                style={{
                  color: "red",
                }}
              >
                Invalid EmailId
              </span>
            ) : null}

            <TextField
              id="password"
              label="password"
              variant="standard"
              autoComplete="off"
              type="password"
              sx={{ marginBottom: 2 }}
              value={password}
              onChange={getPwd}
            ></TextField>
            {pwdErr ? (
              <span
                style={{
                  color: "red",
                }}
              >
                Invalid password
              </span>
            ) : null}

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value={isChecked}
                    checked={isChecked}
                    onChange={getCheckboxValue}
                  />
                }
                label="remember me"
                sx={{ marginBottom: 2 }}
              />
            </FormGroup>

            <Button variant="contained" type="submit" disabled={disabled}>
              submit
            </Button>
          </FormControl>
          <br />
          <br />
          <div>
            <Link to="/login">Have You already register? Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}
