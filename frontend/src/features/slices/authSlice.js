import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    name: "",
    email: "",
    role: "",
    access_token: "",
    loading: false,
    message: "",
    errors: []
}

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, { email, password })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }

})
export const logout = createAsyncThunk("auth/logout", async (access_token, thunkApi) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/logout`, { token: access_token })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }

})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.access_token = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            const { email, name, role, access_token } = action?.payload?.data
            console.log("sukses", action.payload)
            state.email = email
            state.role = role
            state.access_token = access_token
            state.name = name
            state.loading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            state.message = action.payload?.message
            state.errors = action?.payload?.errors
            state.loading = false
        })
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            return initialState
        })
        builder.addCase(logout.rejected, (state, payload) => {
            console.log("logout failed")
        })
    }
})
export const { setToken } = authSlice.actions
export default authSlice.reducer
