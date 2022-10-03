import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

export default function SignIn() {
  const auth = useAuth();
  const [err, setErr] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    if (auth.user) {
      navigator("/home");
    }
  }, [auth]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErr("");
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    auth.login(email, password).then((data) => {
      if (!data.success) {
        setErr(data.message);
      }
      event.target.reset();
    });
  };

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={"weightback"}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {err && <Alert severity="error">{err}</Alert>}
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
            autoComplete="current-password"
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
              <Grid item>
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