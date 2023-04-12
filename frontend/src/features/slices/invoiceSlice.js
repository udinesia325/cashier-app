const { createSlice, createSelector } = require("@reduxjs/toolkit")

const initialState = {
    products: [],
    subtotal: 0,
    pay: 0,
    change: 0,
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
            } else {
                state.products[index].qty++
            }
        },
        incrementQty(state, action) {
            const index = state.products.findIndex(p => p.uuid == action.payload.uuid)

            state.products[index].qty++
        },
        decrementQty(state, action) {
            const index = state.products.findIndex(p => p.uuid == action.payload.uuid)
            if (state.products[index].qty >= 1) {
                state.products[index].qty--
            }
        },
        setPay(state, action) {
            state.pay = action.payload
        },
        removeItem(state, action) {
            state.products = state.products.filter(product => product.uuid != action.payload)
        },
        resetItem(state) {
            return initialState
        }
    }
})

export const { addItem, incrementQty, decrementQty, setPay, removeItem, resetItem } = invoiceSlice.actions
export default invoiceSlice.reducer

export const selectInvoice = state => state.invoice

export const calculate = createSelector(
    [selectInvoice],
    invoice => {
        const subtotal = invoice.products.reduce((total, product) => {
            return total + (product.price * product.qty)
        }, 0)
        const change = invoice.pay == 0 ? 0 : invoice.pay - subtotal
        return { subtotal, change, pay: invoice.pay }
    }
)
