import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) ?? [],
   
  }
  
  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addTocart:(oldData,reqData)=>{
            oldData.cart.push(reqData.payload)
            localStorage.setItem("cart", JSON.stringify(oldData.cart));
        },
        removeCart:(oldData,reqData)=>{
          let pid=reqData.payload.pid;
          oldData.cart=   oldData.cart.filter((items)=>items.PId!=pid)
          localStorage.setItem("cart", JSON.stringify(oldData.cart));
        },
        changeQty: (oldData, reqData) => {
           oldData.cart=oldData.cart.map((items)=>{
              if(items.PId==reqData.payload.pid){
                items.qty=reqData.payload.qty
              }
              return items;
            })
            localStorage.setItem("cart", JSON.stringify(oldData.cart));

        }
    }
  })

  export const { addTocart,removeCart,changeQty } = cartSlice.actions;

export default cartSlice.reducer;
