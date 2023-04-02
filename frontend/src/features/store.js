import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import productsApi from "./api/productsApi"
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
    [productsApi.reducerPath]: productsApi.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(productsApi.middleware)
})

export const persistor = persistStore(store)


