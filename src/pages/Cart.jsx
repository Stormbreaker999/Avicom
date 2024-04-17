import React, { useContext } from 'react'
import {Container, Grid, Typography, Card, CardMedia, CardContent, Box, Rating, TextField, Button} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from '@emotion/react';
import { getSubTotal } from '../utils';
import { addToCart, removeFromCart } from '../features/cart-slice';
import { useNavigate } from 'react-router-dom';
function Cart() {
  const cartItems=useSelector(state=>state.cart?.value);
  const subtotal=getSubTotal(cartItems)?.toFixed(2);
  const theme=useContext(ThemeContext);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  function checkoutItems(){
    navigate("/checkout");
  }
  const handleQuantityUpdate=(e, {product, quantity})=>{
  
    const updated= e.target.value;
    
    if(updated<quantity){
      dispatch(removeFromCart({product, quantity:quantity-updated}));
    }
    else{
      dispatch(addToCart({product, quantity:updated-quantity}))
    }
  }
  return (
    <Container sx={{py:8}}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cartItems?.map(({product, quantity})=>{
            const {title,id,price, description, rating, image}=product;
              
            return <Grid item key={id} xs={12}>
                <Card sx={{display:"flex", py:"2"}}>
                  <CardMedia component="img" image={image} sx={{width:theme.spacing(30), height:theme.spacing(30), objectFit:"contain", pt:theme.spacing()}} alt={title}/>
                  <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                      <Typography>{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate}/>
                      <form>
                        <TextField sx={{width:theme.spacing(8) }} inputProps={{min:0, max:10}} id={`${id}_prod`} type="number" variant="standard" label="quantity" value={quantity} onChange={(e)=>handleQuantityUpdate(e, {product, quantity})}></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubTotal([{product, quantity}]).toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
            </Grid>
          })}

        </Grid>
        <Grid item container md={4} sx={{
          display:"flex",
          justifyContent:"center"
        }}>
          <Box sx={{widht:"100%", }}>
            <Card sx={{padding:2, display:"flex", flexDirection:"column", gap:2}}><Typography variant="h4">Subtotal </Typography><Typography variant='h5'>{subtotal}</Typography>
            {subtotal>0?<Button variant="contained" onClick={checkoutItems}>Buy Now</Button>:<Button variant="contained" onClick={()=>navigate("/")}>Shop products</Button>}
            </Card>
          </Box>
          
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart