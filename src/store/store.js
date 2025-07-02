import { configureStore } from '@reduxjs/toolkit'
import { toyReducer } from './toy/toy.reducer.js'

export const store = configureStore({
  reducer: {
    toyModule: toyReducer
  }
})
