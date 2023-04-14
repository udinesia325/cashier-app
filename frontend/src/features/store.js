import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import productsSlice from "./slices/productsSlice"
import invoiceSlice from "./slices/invoiceSlice"


const persistConfig = {
    key: 'root',
    storage
}

// taruh semua reducer disini
const rootReducer = combineReducers({
    auth: authSlice,
    products: productsSlice,
    invoice: invoiceSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)


