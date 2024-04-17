import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAddress } from '../features/checkout-slice';

function AddressForm() {
    const address=useSelector(state=>state.checkout?.address);
    const dispatch=useDispatch();
    function handleChange(e){
        
        
        const {name, value}=e.target??{};

        dispatch(updateAddress({[name]:value}));

    }
  return (
    <>
    <Typography variant="h6" gutterBottom>Shopping Address</Typography>
    <Box component="form" sx={{mb:1}} onChange={handleChange}>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <TextField required id="firstname" name="firstname" label="First Name" fullWidth autoComplete='given-name' variant="standard" defaultValue={address.firstName??""}></TextField>
            </Grid>
            <Grid item xs={12} sm={6} sx={{}}>
                <TextField required id="lastname" name="lastname" label="Last Name" fullWidth autoComplete='family-name' variant="standard" defaultValue={address.lastName??""}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="address1" name="address1" label="Address Line 1" fullWidth autoComplete='shipping address-line1' variant="standard" defaultValue={address.address1??""}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="address2" name="address2" label="Address Line 2" fullWidth autoComplete='shipping address-line2' variant="standard" defaultValue={address.address2??""}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="city" name="city" label="City" fullWidth variant="standard" defaultValue={address.city??""}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="zipcode" name="zipcode" label="Zipcode/Pincode" fullWidth variant="standard" defaultValue={address.zipcode??""}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField required id="country" name="country" label="Country" fullWidth variant="standard" defaultValue={address.country??""}></TextField>
            </Grid>
        </Grid>
    </Box>
    </>
  )
}

export default AddressForm