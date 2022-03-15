// initial state and reducers for authentication live here
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    // just pertains to auth/user part of the state
    user: user ? user : null, 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: () => {}
})

export const {reset} = authSlice.actions
export default authSlice.reducer