import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NavBar from "./NavBar" 
import { useAuth } from "../hooks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function App() {

  const auth = useAuth();

  if (auth.loading) {
    return (
      <Box sx={{ width: "90%", mt: "50%", ml: "auto", mr: "auto" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    // <ThemeProvider theme={darkTheme}>
    <>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<SignIn />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/home" element={<HomePage />}></Route>
    </Routes>
    </>
    // </ThemeProvider>
  );
}

export default App;
