import React, {useState} from "react";
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
import {Dialog, IconButton, ImageList, ImageListItem} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

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

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat};
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
];

const TabularData = () => {
    const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));
    const [value1, setValue1] = useState(dayjs('2014-08-18T21:11:54'));
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);


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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
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
                        label="Number Plate"
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
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    onClick={() => {handleClickOpen(row);}}
                                >
                                    {row.fat}
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
                    <ImageList sx={{ width: 500, height: 450 }} cols={1} >
                            <ImageListItem key={data.img}>
                                <img
                                    src={`${data.fat}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${data.fat}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={data.name}
                                    loading="lazy"
                                />
                            </ImageListItem>
                    </ImageList>
                </Grid>
            </Dialog>
        </LocalizationProvider>
    );
}

export default TabularData;