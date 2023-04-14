import axiosClient from "@/features/axiosClient"
import { setProducts } from "@/features/slices/productsSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import useSWR from "swr"

const useProducts = () => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const getProducts = async (url, page) => {
        const response = await axiosClient.get(`${url}?page=${page}`)
        dispatch(setProducts(response.data.data))
        return response.data

    }
    const { data, isLoading, error } = useSWR(["products", page], ([url, page]) => getProducts(url, page))
    const nextPage = () => setPage(page => page + 1)
    const prevPage = () => setPage(page => page - 1)
    return { products: data?.data, nextPage, prevPage, isLoading, error, meta: data?.meta }
}

export default useProducts
