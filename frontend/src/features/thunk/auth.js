import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../axiosInstance";

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, { email, password })
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
