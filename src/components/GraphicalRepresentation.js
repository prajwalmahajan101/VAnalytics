import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import BarGraph from "./Bar"
import LineGraph from "./lineGraph"


const GraphicalRepresentation = () =>{
    return(
        <Container component="main" >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                className={"blackback"}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} style={{borderWidth:"3px"}} >
                        <BarGraph />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LineGraph />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LineGraph />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <BarGraph />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default GraphicalRepresentation;