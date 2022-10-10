import React, {useEffect, useState} from "react";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import {Dialog, IconButton, ImageListItem, Stack} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import Tooltip from "@mui/material/Tooltip";
import AddIcon from '@mui/icons-material/Add';
import CreateVehicleData from "./CreateVehicleData";
import {getRecords} from "../apis";
import Alert from "@mui/material/Alert";

let API_ROOT = process.env.REACT_APP_API_ROOT;

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TabularData = () => {
    const [value, setValue] = useState(dayjs(new Date()).subtract(10,'day'));
    const [value1, setValue1] = useState(dayjs(new Date()).add(1,'day'));
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [rows,setRows] = useState([]);
    const [create,setCreate] = useState(false);

    const [err,setErr] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            const edate = dayjs(new Date()).add(1,'day').format('YYYY-MM-DD');
            const sdate = dayjs(new Date()).subtract(10,'day').format('YYYY-MM-DD');
            const data = {edate,sdate};
            return await getRecords(data);
        }
        fetchData().then(res=>setRows(res.data)).catch(err=>console.log(err));
    },[])


    const handleCreateOpen = () =>{
        setCreate(true);
    }
    const handleCreateClose = () =>{
        setCreate(false);
    }

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const handleChange1 = (newValue1) => {
        setValue1(newValue1);
    };

    const handleClickOpen = (data) => {
        setData(data);
        setOpen(true);
    };

    const handleClose = () => {
        setData({});
        setOpen(false);
    };


    let handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            NumPlate:data.get("numberPlate"),
            sdate:value.format('YYYY-MM-DD'),
            edate:value1.format('YYYY-MM-DD')
        }
        console.log(formData)
        try {
            let response = await getRecords(formData);
            setRows(response.data);
        }
        catch (err){
            setErr("Number Plate Not Found")
            setTimeout(()=>{
                setErr(null);
            },5000)
        }
    }


    return (
        <Box className={"blackback"}>
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
                        value={value1}
                        onChange={handleChange1}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={12} sm={5} sx={{ml:2}}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="YYYY-MM-DD"
                        name={"sdate"}
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        fullWidth
                        id="numberPlate"
                        label="Search Number Plate"
                        name="numberPlate"
                        autoFocus
                    />
                </Grid>
                <Stack direction={"row-reverse"} sx={{marginRight:"20%"}}>
                    <Tooltip title="Add Vehicle Data">
                        <Button variant="outlined" endIcon={<AddIcon />} onClick={handleCreateOpen}>
                            Add Vehicle Data
                        </Button>
                    </Tooltip>
                </Stack>
            </Box>
            <TableContainer component={Paper}>
                {err && <Alert severity="error">{err}</Alert>}
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Number Plate</StyledTableCell>
                            <StyledTableCell align="right">Camera Id</StyledTableCell>
                            <StyledTableCell align="right">Image Path</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.TripID}>
                                <StyledTableCell component="th" scope="row">
                                    {row.Vehicle}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.CameraId}</StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    onClick={() => {handleClickOpen(row);}}
                                >
                                    {row.ImagePath}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
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
                            Image
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid item xs={10}>
                            <ImageListItem key={data.numberPlate}>
                                <img
                                    src={`${API_ROOT}${data.FilePath}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${API_ROOT}${data.FilePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={data.numberPlate}
                                    loading="lazy"
                                    style={{maxHeight:"85vh",marginTop:"20px"}}
                                />
                            </ImageListItem>
                </Grid>
            </Dialog>
            <Dialog
                fullScreen
                open={create}
                onClose={handleCreateClose}
                TransitionComponent={Transition}
            >
                <CreateVehicleData handleClose={handleCreateClose} setData={setRows}/>
            </Dialog>
        </LocalizationProvider>
        </Box>

    );
}

export default TabularData;