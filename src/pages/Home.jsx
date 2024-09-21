import React, { useEffect, useState } from 'react'
import {Outlet, useSearchParams} from 'react-router-dom'
import {Container, Grid, Card, CardMedia, CardActions, Typography, CardContent, Rating, Button} from '@mui/material'
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import ShoppingCartSharp from '@mui/icons-material/ShoppingCartSharp'
import { addToCart } from '../features/cart-slice';
import {useSelector} from 'react-redux'
import { fetchAllProducts } from '../features/product-slice';
function Home() {
    const [searchParams]=useSearchParams();
    const category=searchParams.get("category");
    const searchTerm=searchParams.get("searchTerm");
    const theme =useTheme();
    const state=useSelector(state=>state.products);
    console.log(state);
    const {value:products, loading}=state??{};
    
    const dispatch =useDispatch();
    if(!products?.length){
        dispatch(fetchAllProducts());
    }
    
    function addProductToCart(product){
        //dispatch an action 
        dispatch(addToCart({product, quantity:1}));

    }
    let filteredProducts=category && category!=="all"?products.filter(prod=>prod.category===category):products;
    filteredProducts=searchTerm?filteredProducts.filter(prod=>prod.title.includes(searchTerm)):filteredProducts;
  return (
      <Container sx={{py:8}} maxWidth="lg">
        <Grid container spacing={4}>
            {filteredProducts?.map(({title,id, price, description, rating, image})=>(<Grid item key={id} xs={12} sm={6} md={3}>
                <Card sx={{height:"100%", display:"flex", flexDirection:"column", padding:theme.spacing(2,0)}}>
                     <CardMedia component="img" sx={{alignSelf:"cemter", width:theme.spacing(30), height:theme.spacing(30), objectFit:"contain", pt:theme.spacing()}} image={image} alt={title} />
                     <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom sx={{
                            overflow:"hidden",
                            textOverflow:"ellipsis",
                            display:"-webkit-box",
                            "-webkit-line-clamp":"1",
                            "-webkit-box-orient":"vertical",
                        }}>{title}</Typography>
                        <Typography paragraph color="text.secondary" sx={{
                            overflow:"hidden",
                            textOverflow:"ellipsis",
                            display:"-webkit-box",
                            WebkitLineClamp:"2",
                            WebkitBoxOrient:"vertical",
                        }}>{description}</Typography>
                        <Typography fontSize="large" paragraph>{price} ₹</Typography>
                        <Rating readOnly precision={0.5} value={rating.rate}/>
                     </CardContent>
                     <CardActions sx={{
                        alignSelf:"center"
                     }}>
                        <Button variant="contained" onClick={()=>addProductToCart({title,id, price, description, rating, image})}>
                            <ShoppingCartSharp/>
                            Add to Cart
                        </Button>
                     </CardActions>
                </Card>
            </Grid>))}
        </Grid>
      </Container>
  )
}

export default Home
