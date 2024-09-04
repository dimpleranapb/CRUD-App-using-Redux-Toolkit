import { configureStore } from '@reduxjs/toolkit'
import userDetail  from '../features/usesDetailsSlice'

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
})