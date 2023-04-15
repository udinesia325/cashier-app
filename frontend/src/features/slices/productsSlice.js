import axiosClient from "../axiosClient"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    products: []
}

export const deleteProducts = createAsyncThunk("products/deleteProducts", async (uuid, thunkApi) => {
    try {
        await axiosClient.delete(`products/${uuid}`)
        return uuid
    } catch (err) {
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
            console.log(state.products)
        })
        builder.addCase(deleteProducts.rejected, (state, action) => {
            // console.log(action.payload)
        })
    }
})

export const { setProducts, addProducts } = productsSlice.actions
export default productsSlice.reducer
