import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
export const fetchAllProducts=createAsyncThunk('products/fetchAll', async()=>{
    const response=await fetch('https://fakestoreapi.com/products');
    //const response=await fetch('http://localhost:3000/products');
    console.log("Done");
    return await response.json();
})

const productSlice=createSlice({
    name:"products",
    initialState:{
        value:[],
        loading:false
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending, (state)=>{
            state.loading=true;
        }),
        builder.addCase(fetchAllProducts.fulfilled, (state, action)=>{
            state.value=action.payload;
            console.log("Done");
            state.loading=false;
        })
    }
})
export default productSlice.reducer;