import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'; //used for Material UI DateField
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; //used for Material UI DateField

import { Provider } from 'react-redux'

import { useState, useEffect } from 'react';
import ProductsPage from './pages/productsPage';

import {store as productStore} from "./redux/productStore"



function App() {

  // const dispatch = useDispatch()

  //move to inner component?
  // dispatch(fetchProducts())

  return (
    <Provider store={productStore}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ProductsPage/>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;