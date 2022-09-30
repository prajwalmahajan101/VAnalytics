import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../hooks";

const ResponsiveAppBar = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const auth = useAuth();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href={auth.user?"/home":"/"}
              sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              VAnalytics

            </Typography>
            {auth.user && <Box
              sx={{ flexGrow: 0 }}
              onClick={() => {
                auth.logout();
              }}
            >
              <Tooltip title="Logout">
                <Button variant="outlined" endIcon={<LogoutIcon />}>
                  Logout
                </Button>
              </Tooltip>
            </Box>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;