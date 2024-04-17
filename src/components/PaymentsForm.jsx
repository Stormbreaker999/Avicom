import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { updatePayment } from '../features/checkout-slice';
import { useDispatch, useSelector } from 'react-redux';

function PaymentsForm() {
    const payment=useSelector(state=>state.checkout?.payment);
    const dispatch=useDispatch();
    function handleChange(e){
    
        const {name, value}=e.target??{};
        console.log(name, value);
        dispatch(updatePayment({[name]:value}));

    }
    
  return (
    <>
    <Typography variant="h6">
        Payment Method
    </Typography>
    <Box component="form" onChange={handleChange}>
        <Grid container spacing={3} sx={{}}>
            <Grid item xs={12} sm={6}>
                <TextField name="name" id="name" variant="standard" required label="Name on card" fullWidth autoComplete='cc-name' defaultValue={payment?.name?? ""}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField name="cardNumber" id="cardNumber" variant="standard" required label="Card Number" fullWidth defaultValue={payment?.cardNumber?? ""}/>

            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField name="expDate" id="expDate" variant="standard" required label="Expiry Date" fullWidth defaultValue={payment?.expDate?? ""}/>
                
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField name="cvv" type="password" id="cvv" variant="standard" required label="CVV" fullWidth defaultValue={payment?.cvv?? ""}/>
                
            </Grid>
        </Grid>
    </Box>
    </>
  )
}

export default PaymentsForm