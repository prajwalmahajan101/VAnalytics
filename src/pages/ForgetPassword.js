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
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

export default function ForgetPassword() {
  const [err, setErr] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErr("");
    const data = new FormData(event.currentTarget);
    console.log({
        email : data.get("email"),
        password: data.get("password"),
        confirmpassowrd: data.get("con_password")

    })    
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
          Forget Password
        </Typography>
        {err && <Alert severity="error">Wrong Email or Password</Alert>}
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
            Sign In
          </Button>
          <Grid container>
              <Grid item xs={6}>
              Remembered Your Password?<> </>
                <Link href="/" underline="none" variant="body1">
                    Sign In
                </Link>
              </Grid>
              <Grid item xs={6}>
              Don't have an account?
              <> </>
                <Link href="/signup" underline="none" variant="body1">
                Sign Up
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box>
    </Container>
  );
}