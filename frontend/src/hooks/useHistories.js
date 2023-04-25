import axiosClient from "@/features/axiosClient"
import { useState } from "react"
import useSWR from "swr"

const useHistories = () => {
    const [page, setPage] = useState(1)
    const getHistories = async (url) => {
        const response = await axiosClient.get(url)
        return response.data

    }
    const { data, isLoading, error } = useSWR(`histories?page=${page}`, getHistories)
    // console.log(data)
    const nextPage = () => setPage(page + 1)
    const prevPage = () => setPage(page - 1)
    return { histories: data?.data, nextPage, prevPage, isLoading, error, meta: data?.meta, links: data?.links }
}

export default useHistories
