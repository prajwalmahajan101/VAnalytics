import React from "react";
import Toolbar from "@mui/material/Toolbar";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

const EditVehicleData = (props) =>{
    const {handleClose, data} = props
    console.log(data)
    return (
        <>
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
                        Edit Vehicle Data
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>Edit is working for {data.NumPlate}</div>
        </>
    );
}
export default EditVehicleData;