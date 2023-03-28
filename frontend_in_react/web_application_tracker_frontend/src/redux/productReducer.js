//This is a reducer for the Products type.
//It will allow to asynchronously fetch data from the backend 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// must place dispatch(fetchProducts()) in the corresponding location where it'd be good to fetch this data 
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
    async() => {

        let payload = []

        await fetch("http://localhost:3000/api/products", {mode:"cors"})
        .then((response) => response.json() )
        .then((data) => {
            console.log(data)
            payload = data
          })
        
        return payload
    }
);


const productDataSlice = createSlice({
  name: 'product',
  initialState: {products:[], products_by_scrum_master:[], products_by_developer:[]},
  reducers: {
    //this is not actually used in this module, but it helps to see the structure of the data :)
    productDataFetched(state, action) {
      state.push({
        productId : action.payload.productId,
        productName : action.payload.productName,
        productOwnerName : action.payload.productOwnerName,
        productOwnerName : action.payload.productOwnerName,
        Developers : action.payload.Developers,
        scrumMasterName : action.payload.scrumMasterName,
        startDate : action.payload.startDate,
        methodology : action.payload.methodology
      })
    },
  },
    extraReducers(builder) {
      builder
        .addCase(fetchProducts.pending, (state, action) => {
          //
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          console.log("fulfilled, payload :", action)
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          console.log("error in extra reducers (fetchProducts)");
        });
    },
  
});

export const { productDataFetched } = productDataSlice.actions;
export default productDataSlice.reducer;