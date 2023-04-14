const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    products: []
}

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
    }
})

export const { setProducts, addProducts } = productsSlice.actions
export default productsSlice.reducer
