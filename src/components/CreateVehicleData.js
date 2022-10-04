import React, {useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const CreateVehicleData = (props) =>{
    const {handleClose,setData,updateMainData} = props
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        setErr("");
        setSucc("");
        const formData = new FormData(event.currentTarget);
        let data = {
            NumPlate:formData.get("NumPlate"),
            cameraId:formData.get("cameraId"),
            FilePath:formData.get("FilePath")
        }

        //

        //APi Call

        //

        setData((prevData)=>[...prevData,data]);
        updateMainData((prevData)=>[...prevData,data]);
        handleClose();
    };

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    });
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add Vehicle Data
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <ThemeProvider theme={lightTheme}>
                <div className={"backimg"}>
                    <Container component="main" maxWidth="md" >
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
                            {err && <Alert severity="error">{err}</Alert>} {succ && <Alert severity="success">{succ}</Alert>}
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="NumPlate"
                                    label="Number Plate"
                                    name="NumPlate"
                                    autoFocus

                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="cameraId"
                                    label="Camera Id"
                                    id="cameraId"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="FilePath"
                                    label="Img Path"
                                    id="FilePath"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Data
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </ThemeProvider>

        </>

    );
}

export default CreateVehicleData;