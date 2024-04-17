
import {useTheme, Avatar, Container, CssBaseline , TextField, Typography, Box, Button, Grid} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { useState } from 'react'
import { useAuth } from '../firebase/Auth';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const {signUp}=useAuth();
    const navigate=useNavigate();
    async function registerUser(e){
        e.preventDefault();
        const data=new FormData(e.currentTarget);
        await signUp(data.get("email"), data.get("password"), data.get("name"));
        navigate("/login");
    }
  return (
    <Container component={"main"} maxWidth="xs">
        <CssBaseline/>
        <Box sx={{mt:8, display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Avatar sx={{m:1, bgcolor:"secondary.main"}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component={"h1"} variant="h5">Sign Up</Typography>
            <Box component={"form"} onSubmit={registerUser} sx={{mt:3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField autoComplete="given-name" name="name" id="name" fullWidth required autoFocus label="Full Name"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField autoComplete="email" name="email" id="email" fullWidth required label="Email"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField autoComplete='new-password' type="password" name="password" id="password" fullWidth required label="Password"></TextField>
                    </Grid>
                    
                </Grid>
                <Button type="submit" fullWidth variant='contained' sx={{mt:3, mb:2}}>Register</Button>
                <Grid container justifyContent={"flex-end"}>
                    <Grid item>
                        <Link variant="body2" to="/login">Already have an account? Sign In</Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default Register