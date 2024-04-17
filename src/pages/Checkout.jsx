import React, { useEffect, useState } from 'react'
import {Link, Outlet, useSearchParams} from 'react-router-dom'
import {Container, Grid, Card, CardMedia, CardActions, Typography, CardContent, Rating, Button, Paper, Step, Stepper, StepLabel, Box} from '@mui/material'
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import ShoppingCartSharp from '@mui/icons-material/ShoppingCartSharp'
import { addToCart, clearCart } from '../features/cart-slice';
import {useSelector} from 'react-redux'
import AddressForm from '../components/AddressForm';
import PaymentsForm from '../components/PaymentsForm';
import ReviewForm from '../components/ReviewForm';
import { clearCheckoutInfo } from '../features/checkout-slice';

const steps=["Shipping Address", "Payment Details", "Review Order"];

function getStepContent(activeStep){
  switch(activeStep){
    case 0:
      return <AddressForm/>;
    case 1:
      return <PaymentsForm/>;
    case 2:
      return <ReviewForm/>
    default:
      throw new Error("Unknown step")
  }
}

function Checkout() {
  const dispatch=useDispatch();
  const [activeStep, setActiveStep]=useState(0);
  useEffect(()=>{
    if(activeStep==steps.length){
      dispatch(clearCart());
      dispatch(clearCheckoutInfo);
    }
  }, [activeStep])
  function handleNext(){
    setActiveStep(activeStep+1);
  }
  function handleBack(){
    setActiveStep(activeStep-1);
  }
  return (
    <Container component="section" maxWidth="lg"
    sx={{mb:4}}>
      <Paper variant="outlined" sx={{my:{xs:3, md:6}, p:{xs:2, md:3}}}> 
      <Typography component={"h1"} variant="h4" align="center">Checkout</Typography>
      <Stepper activeStep={activeStep} sx={{pt:3, pb:5, }}>
        {steps.map((label)=>(<Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>))}

      </Stepper>
      {activeStep===steps.length?
      <>
      <Typography variant="h5" gutterBottom>Thank You for your order</Typography>
      <Typography variant="h5" gutterBottom>Your order number is: 123456. We have emailed you order details regarding order confirmation.</Typography>
      <Link to="/">Shop More</Link>
      </>
      :<>{getStepContent(activeStep)}
      <Box sx={{display:"flex", justifyContent:"flex-end"}}>
        {activeStep!==0 && <Button sx={{mt:3, ml:1}} variant="contained" onClick={handleBack}>Back</Button>}
        <Button variant="contained" sx={{mt:3, ml:1}} onClick={handleNext}>{activeStep===steps.length-1?"Place Order":"Next"}</Button>
      </Box>
      </>}
      </Paper>
    </Container>
  )
}

export default Checkout