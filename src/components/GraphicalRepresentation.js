import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Line } from 'react-chartjs-2';
import dayjs from "dayjs";
import {getDailyKPI} from "../apis";
import { options, data } from "./lineGraph"
import _ from 'lodash';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

const GraphicalRepresentation = () =>{
    const [labels,setLabels] = useState([]);
    const [vehicleCount,setVehicleCount] = useState([]);
    const [entryCount,setEntryCount] = useState([]);
    const [VMSValidatedVehCount,setVMSValidatedVehCount] = useState([]);
    const [sdate, setSDate] = useState(dayjs(new Date()).subtract(30,'day'));
    const [edate, setEDate] = useState(dayjs(new Date()).add(1,'day'));
    useEffect(()=>{
        const fetchData = async () =>{
            const edate = dayjs(new Date()).add(1,'day').format('YYYY-MM-DD');
            const sdate = dayjs(new Date()).subtract(30,'day').format('YYYY-MM-DD');
            const response  = await getDailyKPI(sdate,edate);
            return response.data;
        }
        fetchData().then(res=> {
            createData(res);
        }).catch(err=>console.log(err));
    },[])


    const createData = (res) =>{
        setLabels(res.map(el=>el.date));
        setVehicleCount(res.map(el=>parseInt(el.VehicleCount)));
        setEntryCount(res.map(el=>parseInt(el.EntryCount)));
        setVMSValidatedVehCount(res.map(el=>parseInt(el.VMSValidatedVehCount)));
    }

    const handleChange = (newValue) => {
        setSDate(newValue);
    };
    const handleChange1 = (newValue1) => {
        setEDate(newValue1);
    };
    let handleSubmit = async (event) => {
        event.preventDefault();
        const response  = await getDailyKPI(sdate.format('YYYY-MM-DD'),edate.format('YYYY-MM-DD'));
        createData(response.data);
        event.target.reset();

    }

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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        component="form" onSubmit={handleSubmit} noValidate
                        sx={{
                            marginBottom: 5,
                            display: "flex",
                            flexDirection: "row-reverse",
                            alignItems: "right",
                        }}

                    >
                        <Grid item xs={12} sm={2} sx={{ml:2}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt:1}}
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={5} sx={{ml:2}}>
                            <DesktopDatePicker
                                label="End desktop"
                                inputFormat="YYYY-MM-DD"
                                name={"edate"}
                                value={edate}
                                onChange={handleChange1}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5} sx={{ml:2}}>
                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="YYYY-MM-DD"
                                name={"sdate"}
                                value={sdate}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Box>
                </LocalizationProvider>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} style={{borderWidth:"3px"}} >
                        <Box sx={{ p: 2, border: '5px solid grey' }}>
                            <Line
                                options={
                                {...options
                                    ,plugins:
                                        {...options.plugins,
                                            title:
                                                {text:"Vehicle Count", display: true }
                                        }
                                }}
                                data={
                                {
                                    labels:labels,
                                    datasets:[
                                        {...data.datasets[0],
                                            label:"Vehicle Count",
                                            data: vehicleCount
                                        }
                                    ]
                                }
                            } />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ p: 2, border: '5px solid grey' }}>
                            <Line
                                options={
                                    {...options,
                                        plugins:
                                            {...options.plugins,
                                                title:{text:"Entry Count", display: true }
                                            }
                                    }}
                                data={
                                    {
                                        labels:labels,
                                        datasets:[
                                            {...data.datasets[0],
                                                label:"Entry Count",
                                                data: entryCount
                                            }
                                        ]
                                    }
                                } />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ p: 2, border: '5px solid grey'}}>
                            <Line
                                options={
                                    {...options
                                        ,plugins:
                                            {...options.plugins,
                                                title:
                                                    {text:"VMS Validated Vehicle Count", display: true }
                                            }
                                    }}
                                data={
                                    {
                                        labels:labels,
                                        datasets:[
                                            {...data.datasets[0],
                                                label:"VMS Validated Vehicle Count",
                                                data: VMSValidatedVehCount
                                            }
                                        ]
                                    }
                                } />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ p:2 ,border: '5px solid grey',minHeight:"100%"}}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow key="tableHead">
                                        <TableCell>Count Title</TableCell>
                                        <TableCell align="right">Count</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key="vehicleCount">
                                        <TableCell>Vehicle Count</TableCell>
                                        <TableCell align="right">{_.sum(vehicleCount)}</TableCell>
                                    </TableRow>
                                    <TableRow key={"entryCount"}>
                                        <TableCell>Entry Count</TableCell>
                                        <TableCell align="right">{_.sum(entryCount)}</TableCell>
                                    </TableRow>
                                        <TableRow key={"VMSValidatedVehCount"}>
                                        <TableCell>VMS Validated Vehicle Count</TableCell>
                                        <TableCell align="right">{_.sum(VMSValidatedVehCount)}</TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default GraphicalRepresentation;