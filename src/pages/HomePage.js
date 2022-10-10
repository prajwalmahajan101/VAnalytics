import * as React from 'react';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabularData from "../components/TabularData"
import GraphicalRepresentation from "../components/GraphicalRepresentation";
import NewInfo from "../components/NewInfo";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useAuth} from "../hooks";
import {useEffect} from "react";
import {useNavigate} from "react-router";

function HomePage() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigator = useNavigate();
    const authUser = useAuth();
    useEffect(()=>{
        if(!authUser.user){
            navigator("/");
        }
        // eslint-disable-next-line
    },[authUser])
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="DashBoard" value="1" />
                        <Tab label="Tabular Data" value="2" />
                        <Tab label="Live Info" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <GraphicalRepresentation />
                </TabPanel>
                <TabPanel value="2">
                    <TabularData />
                </TabPanel>

                <TabPanel value="3">
                    <NewInfo />
                </TabPanel>
            </TabContext>
        </Box>
        </ThemeProvider>
    );
}

export default HomePage;