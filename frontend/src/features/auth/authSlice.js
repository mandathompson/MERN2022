// initial state and reducers for authentication live here
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

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

// Register user 
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {      // first arg is action, 
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && 
                         error.response.data && 
                         error.response.data.message) || 
                         error.message || 
                         error.toString() //if any exist it will be put into variable
        return thunkAPI.rejectWithValue(message)
    }
})   

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
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {  // action is the payload being returned from register func
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload 
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload  //sets the message in payload that we passed in above in catch
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer