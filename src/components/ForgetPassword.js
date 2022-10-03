import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import {validateInput} from "../utils";

export default function ForgetPassword() {
  const [err, setErr] = useState(false);
  const [succ, setSucc] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErr("");
    const data = new FormData(event.currentTarget);
    let inputData = {
        email : data.get("email"),
        password: data.get("password"),
        confirm_passowrd: data.get("con_password")

    };
    if(!validateInput(inputData)){
        setErr("Please fill the form completely")
    }
    else if(inputData.password!==inputData.confirm_passowrd){
        setErr("Passwords Don't Match")
    }
    else{
        setSucc("Your Password is Reset");
    }
    event.target.reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {err && <Alert severity="error">{err}</Alert>}{succ && <Alert severity="success">{succ}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="con_password"
            label="Confirm Password"
            type="password"
            id="con_password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}