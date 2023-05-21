import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: "",
}
export const userSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userName = action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer