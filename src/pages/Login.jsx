
import {useTheme, Avatar, Container, CssBaseline , TextField, Typography, Box, Button, Grid} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { useState } from 'react'
import { useAuth } from '../firebase/Auth';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const theme=useTheme();
  const {signIn}=useAuth();
  const [email, setEmail]=useState(null);
  const [password, setPassword]=useState(null);
  const navigate=useNavigate();
  async function login(event){
    
    
    //
    console.log(email, password);
    if(!email || !password){
      alert("User name and Password Required");
      return;
    }
    
    await signIn(email, password);
    navigate("/");
    console.log("Logged in");
    

    
    
  }
  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline/>
      <Box sx={{
        mt:theme.spacing(8),
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        

      }}>
        <Avatar sx={{m:1, backgroundColor:theme.palette.secondary.main}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component={"h1"} variant="h5">Sign In</Typography>
        <form sx={{width:"100%", mt:1}}>
          <TextField label="Email" variant="outlined" margin="normal" required fullWidth id="email" name="email" autoFocus autoComplete="off" onChange={(e)=>{setEmail(e.target.value)}}></TextField>
          <TextField label="Password" variant="outlined" margin="normal" required fullWidth id="password" name="password" type="password" autoComplete="current-password" onChange={(e)=>{setPassword(e.target.value)}}></TextField>
          <Button variant="contained" fullWidth color="primary" sx={{ml:theme.spacing(-0.20), mt:theme.spacing(2)}} onClick={login}>Sign In</Button>
        </form>
        <Grid container justifyContent={"flex-end"} sx={{mt:2}}>
          <Grid item>
            <Link variant="body2" to="/register">New User? Sign Up</Link>
           </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            Sample Login ID: tester@gmail.com
          </Grid>
          <Grid item>
            Sample Password: 123456789
          </Grid>
        </Grid>
      </Box>
    </Container>
    
  )
}

export default Login