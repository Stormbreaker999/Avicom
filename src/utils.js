export function getItemCount(cartItems){
    return cartItems.reduce((sum, cartItem)=>cartItem.quantity+sum,0);
}

export function getSubTotal(cartItem){
    return cartItem.reduce((sum, {product, quantity})=>product.price*quantity+sum, 0);
}