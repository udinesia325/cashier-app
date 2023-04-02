const { createSlice, createEntityAdapter } = require("@reduxjs/toolkit")

const initialState = {
    products: [],
    subtotal: 0,
    pay: 0,
    change: 0,
    total: 0
}
const invoiceAdapter = createEntityAdapter({
    selectId: products => products.uuid
})
const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        addItem(state, action) {
            const index = state.products.findIndex(p => p.uuid == action.payload.uuid)
            console.log(index)
        }
    }
})

export const { addItem } = invoiceSlice.actions
export default invoiceSlice.reducer
