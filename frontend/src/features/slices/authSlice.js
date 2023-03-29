import { delStorage, setStorage } from "@/utils/storage";
import axios from "axios";
import { baseUrl } from "../axiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, { email, password })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }

})
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
            setStorage("access_token", access_token)
        })
        builder.addCase(login.rejected, (state, action) => {
            state.message = action.payload?.message
            state.errors = action?.payload?.errors
            state.loading = false
        })
        builder.addCase(login.pending, (state) => {
            state.loading = true
            delStorage("access_token")
        })
    }
})

export default authSlice.reducer
