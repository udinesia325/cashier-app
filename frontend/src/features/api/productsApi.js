import { createApi } from "@reduxjs/toolkit/query/react"
import axiosInstance from "../axiosInstance"
const productApi = createApi({
    reducerPath: "productsApi",
    baseQuery: axiosInstance,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
            transformResponse: response => response.data
        })
    })
})
export const { useGetProductsQuery } = productApi
export default productApi
