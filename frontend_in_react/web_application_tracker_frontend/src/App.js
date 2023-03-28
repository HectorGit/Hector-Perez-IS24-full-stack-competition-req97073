import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers'; //used for Material UI DateField
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; //used for Material UI DateField

import { useState, useEffect } from 'react';
import ProductsPage from './pages/productsPage';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ProductsPage/>
    </LocalizationProvider>
  );
}

export default App;