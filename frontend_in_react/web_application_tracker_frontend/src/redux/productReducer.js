//This is a reducer for the Products type.
//It will allow to asynchronously fetch data from the backend 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* GET */

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
    async() => {

        let payload = []

        await fetch("http://localhost:3000/api/products", {mode:"cors"})
        .then((response) => response.json() )
        .then((data) => {
            payload = data
          })
        
        return payload
    }
);

export const fetchProductsByScrumMaster = createAsyncThunk(
  "product/fetchProductsByScrumMaster",
    async(scrum_master_name) => {

        let payload = []

        await fetch(`http://localhost:3000/api/products_by_scrum_master/${scrum_master_name}`, {mode:"cors"})
        .then((response) => response.json() )
        .then((data) => {
          payload = data
        })
        
        return payload
    }
);

export const fetchProductsByDeveloper = createAsyncThunk(
  "product/fetchProductsByDeveloper",
    async(developer_name) => {

        let payload = []
        await fetch(`http://localhost:3000/api/products_by_developer/${developer_name}`, {mode:"cors"})
        .then((response) => response.json() )
        .then((data) => {
          payload = data
        })
        
        return payload
    }
);

/* POST */

export const fetchAddProduct = createAsyncThunk(
  "product/fetchAddProduct",
    async(request_body) => {

        let payload = []

        await fetch(`http://localhost:3000/api/add_product`, {
          mode:"cors", 
          method:"POST", 
          body: JSON.stringify(request_body),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }    
        })
        .then((response) => response.json() )
        .then((data) => {
          payload = data
        })
        
        return `completed fetchAddProduct`
    }
);

/* PATCH */

export const fetchUpdateProduct = createAsyncThunk(
  "product/fetchUpdateProduct",
    async([productId,request_body]) => {

        let payload = []

        fetch(`http://localhost:3000/api/update_product/${productId}`, {
          mode:"cors", 
          method:"PATCH", 
          body: JSON.stringify(request_body),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }    
        })
        .then((response) => response.json() )
        .then((data) => {
          payload = data
        })
        
        return `completed fetchUpdateProduct`
    }
);

/* DELETE */

export const fetchDeleteProduct = createAsyncThunk(
  "product/fetchDeleteProduct",
    async(productId) => {

        let payload = []

        await fetch(`http://localhost:3000/api/delete_product/${productId}`, {
          mode:"cors", 
          method:"DELETE"
        })
        .then((response) => response.json() )
        .then((data) => {
          payload = data
        })
        
        return `completed fetchDeleteProduct`
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
          console.log("fetchProducts complete:", action.payload)
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          console.log("error in extra reducers (fetchProducts)");
        })
        .addCase(fetchProductsByScrumMaster.pending, (state, action) => {
          //
        })
        .addCase(fetchProductsByScrumMaster.fulfilled, (state, action) => {
          console.log("fetchProductsByScrumMaster complete:", action.payload)
          state.products_by_scrum_master = action.payload;
        })
        .addCase(fetchProductsByScrumMaster.rejected, (state, action) => {
          console.log("error in extra reducers (fetchProductsByScrumMaster)");
        })
        .addCase(fetchProductsByDeveloper.pending, (state, action) => {
          //
        })
        .addCase(fetchProductsByDeveloper.fulfilled, (state, action) => {
          console.log("fetchProductsByDeveloper complete:", action.payload)
          state.products_by_developer = action.payload;
        })
        .addCase(fetchProductsByDeveloper.rejected, (state, action) => {
          console.log("error in extra reducers (fetchProductsByDeveloper)");
        })
        .addCase(fetchAddProduct.pending, (state, action) => {
          //
        })
        .addCase(fetchAddProduct.fulfilled, (state, action) => {
          console.log("fetchAddProduct complete:", action.payload)
        })
        .addCase(fetchAddProduct.rejected, (state, action) => {
          console.log("error in extra reducers (fetchAddProduct)");
        })
        .addCase(fetchUpdateProduct.pending, (state, action) => {
          //
        })
        .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
          console.log("fetchAddProduct complete:", action.payload)
        })
        .addCase(fetchUpdateProduct.rejected, (state, action) => {
          console.log("error in extra reducers (fetchUpdateProduct)");
        })
        .addCase(fetchDeleteProduct.pending, (state, action) => {
          //
        })
        .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
          console.log("fetchDeleteProduct complete:", action.payload)
        })
        .addCase(fetchDeleteProduct.rejected, (state, action) => {
          console.log("error in extra reducers (fetchDeleteProduct)");
        });
    },
  
});

export const { productDataFetched } = productDataSlice.actions;
export default productDataSlice.reducer;