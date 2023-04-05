const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    products: [],
    subtotal: 0,
    pay: 0,
    change: 0,
    total: 0
}

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        addItem(state, action) {
            const index = state.products.findIndex(p => p.uuid == action.payload.uuid)
            if (index == -1) {
                const { uuid, name, price, image } = action.payload
                state.products.push({
                    uuid, name, price, image,
                    qty: 1
                })
                state.subtotal += price
            } else {
                state.products[index].qty++
                state.subtotal += state.products[index].price
            }
        },
        incrementQty(state, action) {
            const index = state.products.findIndex(p => p.uuid == action.payload.uuid)

            state.products[index].qty++
            state.subtotal += state.products[index].price
        },
        decrementQty(state, action) {
            const index = state.products.findIndex(p => p.uuid == action.payload.uuid)
            if (state.products[index].qty >= 1) {
                state.products[index].qty--
                state.subtotal -= state.products[index].price
            }
        }
    }
})

export const { addItem, incrementQty, decrementQty } = invoiceSlice.actions
export default invoiceSlice.reducer
