import { login, logout } from "../thunk/auth";

const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    name: "",
    email: "",
    role: "",
    access_token: "",
    loading: false,
    message: "",
    errors: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            const { email, name, role, access_token } = action?.payload?.data
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

export default authSlice.reducer
