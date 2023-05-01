import { toast } from "react-toastify"
import axiosClient from "../axiosClient"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    products: [],
    message: "",
    store: {
        isLoading: false,
        errors: [],
        message: ""
    },
    update: {
        isLoading: false,
        errors: [],
        message: ""
    }
}

export const deleteProducts = createAsyncThunk("products/deleteProducts", async (uuid, thunkApi) => {
    try {
        await axiosClient.delete(`products/${uuid}`)
        return uuid
    } catch (err) {
        return thunkApi.rejectWithValue(err.data)
    }
})

export const updateProducts = createAsyncThunk("products/updateProducts", async ({ uuid, formData }, thunkApi) => {
    try {
        const response = await axiosClient.post(`products/${uuid}`, formData, {
            headers: {
                "Content-Type": "multipart/formdata",
            }
        })
        return response.data

    } catch (err) {
        // console.log({ err })
        return thunkApi.rejectWithValue(err.data)
    }
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        },
        addProducts(state, action) {
            state.products.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.products = state.products.filter(prod => prod.uuid != action.payload)
        })
        builder.addCase(deleteProducts.rejected, (state, action) => {
            toast.error(action.payload.message)
        })

        builder.addCase(updateProducts.pending, (state, action) => {
            state.update.isLoading = true
        })
        builder.addCase(updateProducts.fulfilled, (state, action) => {
            toast.success(action.payload.message)
            state.update.errors = []
            state.update.isLoading = false
        })
        builder.addCase(updateProducts.rejected, (state, action) => {
            toast.error(action.payload.message)
            state.update.message = action.payload.message
            state.update.errors = action.payload.errors
            state.update.isLoading = false
        })
    }
})

export const { setProducts, addProducts } = productsSlice.actions
export default productsSlice.reducer
