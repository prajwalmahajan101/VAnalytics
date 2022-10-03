import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import '../styles/SignUp.css';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from "@mui/material/Alert";
import {useState} from "react";
import {validateInput} from "../utils";
import {useNavigate} from "react-router";

export default function SignUp() {
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const navigator = useNavigate();
    const handleSubmit = (event) => {
        setErr("");
        setSucc("");
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            firstname: data.get("firstName"),
            surname: data.get("surname"),
            username: data.get("username"),
            sex: data.get("sex"),
            phone: data.get("phone"),
            rank: data.get("rank"),
            unit: data.get("unit"),
            email: data.get("email"),
            password: data.get("password"),
            confirm_password: data.get("confirm_password"),
        };
        if(!validateInput(formData)){
            setErr("Fill the Form Properly");
        }
        else if(formData.password!==formData.confirm_password){
            setErr("Password's don't Match");
        }
        else{
            setSucc("Signed Up");
            setTimeout(()=>{
                navigator("/")
            },5000);
        }
        event.target.reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                className={"weightback"}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {err && <Alert severity="error">{err}</Alert>}{succ && <Alert severity="success">{succ}</Alert>}
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="surname"
                                label="Last Name"
                                name="surname"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Gender *</InputLabel>
                            <Select label="Gender" labelId="demo-simple-select-helper-label" name="sex" required>
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"transgender"}>TranGender</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="confirm_password"
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                autoComplete="new-password"
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <PhoneInput
                                inputProps={{
                                    name: 'phone',
                                    required: true
                                }}
                                inputClass="phoneContainerClass"
                                disableDropdown
                                onlyCountries={['in']}
                                country={'in'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="rank"
                                required
                                fullWidth
                                id="rank"
                                label="Rank"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="unit"
                                label="Unit"
                                name="unit"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            Already have an account?
                            <> </>
                            <Link href="/" underline="none" variant="body1">
                                Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}