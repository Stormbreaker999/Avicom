import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice =createSlice({
    name:"checkout",
    initialState:{
        address:{},
        payment:{}
    },
    reducers:{
        updateAddress(state,action){
            const {payload}=action;
            state.address={...state.address, ...payload}
        },
        updatePayment(state,action){
            const {payload}=action;
            state.payment={...state.payment, ...payload}
        },
        clearCheckoutInfo(state, action){
            state.address={};
            state.payment={};
        }
    }
})

export const {updateAddress, updatePayment, clearCheckoutInfo}=checkoutSlice.actions;
export default checkoutSlice.reducer;