import React, {useEffect, useState} from "react";
import TabularData from "./TabularData";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Dialog, IconButton, ImageListItem} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Slide from "@mui/material/Slide";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import CssBaseline from "@mui/material/CssBaseline";



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




function createData(NumPlate, cameraId, FilePath) {
    return {NumPlate, cameraId, FilePath};
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Testrows = [
    createData('KA05NC1129', "001","https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2022/08_19_urus_perf/s/gate_models_s_03_m.jpg" ),
    createData('KA05CT1329', "001", "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/images-s/2021/07_07/gate_family_s_01_m.jpg"),
    createData('KA05QC1129', "003","https://www.bugatti.com/fileadmin/_processed_/sei/p63/se-image-1b8a7c167bd3c67312baf6b785410cab.jpg" ),
    createData('KA05CB2139', "006","https://www.carblogindia.com/wp-content/uploads/2019/01/Electric-Ducati-Bike.jpg" ),
    createData('KA05NC1359', "007","https://mir-s3-cdn-cf.behance.net/project_modules/disp/68ef5842786655.56072d7a472b0.jpg" ),
];


const NewInfo = () =>{
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });
    const [temp,setTemp] = useState(1);
    const [rows,setRows] = useState(Testrows)
    useEffect(()=>{
        console.log("upadated")
        setTimeout(()=>{
            setTemp(prevState=>{
                return prevState+1;
            })
            setRows(prevState => {
                return([...prevState,createData('KA05NC1129', "001","https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2022/08_19_urus_perf/s/gate_models_s_03_m.jpg" )])
            })
        },10000)
    },[temp])
    const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));
    const [value1, setValue1] = useState(dayjs('2014-08-18T21:11:54'));
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [main,setMain] = useState(Testrows)
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

    let handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            numberPlate:data.get("numberPlate"),
        }
        if(formData.numberPlate!==""){
            let newRowdata = main.filter((el)=>el.NumPlate===formData.numberPlate);
            console.log(newRowdata)
            setRows(newRowdata);
        }

        event.target.reset();

    }

    return (
        <Box className={"blackback"} >
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
                        inputFormat="MM/DD/YYYY"
                        name={"edate"}
                        value={value1}
                        onChange={handleChange1}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={12} sm={5} sx={{ml:2}}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/DD/YYYY"
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
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Number Plate</StyledTableCell>
                            <StyledTableCell align="right">Camera Id</StyledTableCell>
                            <StyledTableCell align="right">Image Path</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.NumPlate}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.cameraId}</StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    onClick={() => {handleClickOpen(row);}}
                                >
                                    {row.FilePath}
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
                            src={`${data.FilePath}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${data.FilePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={data.numberPlate}
                            loading="lazy"
                            style={{maxHeight:"85vh",marginTop:"20px"}}
                        />
                    </ImageListItem>
                </Grid>
            </Dialog>
        </LocalizationProvider>
        </Box>
    );
}

export default NewInfo;