//This is a Redux store for the project 
//Initial State. (Redux toolkit in particular)

import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productReducer'

export const store = configureStore({
    initialState : {
    },
    reducer: {
      product: productReducer
    }
})