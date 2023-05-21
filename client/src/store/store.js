import { configureStore } from '@reduxjs/toolkit'
import usernameReducer from './userSlice'
import adminReducer from './adminSlice'
export const store = configureStore({
    reducer: {
        user: usernameReducer,
        admin: adminReducer
    },
})