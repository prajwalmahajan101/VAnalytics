import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useAuth} from "../hooks";
import {Dialog, IconButton, Menu} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import ForgetPassword from "./ForgetPassword";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const ResponsiveAppBar = () => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });
    const authUser = useAuth();

    const [auth, setAuth] = React.useState(authUser.user === null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    function handleReset() {
        setAnchorEl(null);
        setOpen(true);

    }

    function handleLogout() {
        setAuth(false);
        auth.logout();
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon sx={{mr: 1}}/>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href={auth.user ? "/home" : "/"}
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
                            {auth && <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleReset}>Reset Password</MenuItem>
                                    <MenuItem onClick={handleLogout}>LogOut</MenuItem>
                                </Menu>
                            </div>}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
            <Dialog
                fullScreen
                open={open}
                onClose={handleModalClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleModalClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Reset Password
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ForgetPassword />

            </Dialog>
        </>
    );
};
export default ResponsiveAppBar;