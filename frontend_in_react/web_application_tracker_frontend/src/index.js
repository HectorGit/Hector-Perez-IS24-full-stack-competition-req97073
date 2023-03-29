import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {store as productStore} from './redux/productStore'
import {fetchProducts} from './redux/productReducer'

//dispatch the fetchProducts() before our root component renders
productStore.dispatch(fetchProducts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);