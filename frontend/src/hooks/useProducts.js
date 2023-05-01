import axiosClient from "@/features/axiosClient"
import { setProducts } from "@/features/slices/productsSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import useSWR from "swr"

const useProducts = () => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const getProducts = async (url) => {
        const response = await axiosClient.get(url)
        dispatch(setProducts(response.data.data))
        return response.data

    }
    const { data, isLoading, error } = useSWR(`products?page=${page}`, getProducts)
    // console.log(data)
    const nextPage = () => setPage(page + 1)
    const prevPage = () => setPage(page - 1)
    return { products: data?.data, nextPage, prevPage, isLoading, error, meta: data?.meta, links: data?.links }
}

export default useProducts
