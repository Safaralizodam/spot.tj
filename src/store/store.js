import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../reducers/home/homeSlice'


export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
})

