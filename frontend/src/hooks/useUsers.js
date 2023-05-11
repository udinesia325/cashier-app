import axiosClient from "@/features/axiosClient"
import { useState } from "react"
import { toast } from "react-toastify"
import useSWR from "swr"

const useUsers = () => {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState([])
    const getUsers = async (url) => {
        const response = await axiosClient.get(url)
        setUsers(response.data.data)
        return response.data

    }
    const { data, isLoading, error } = useSWR(`auth/users?page=${page}`, getUsers)
    const activateUser = async email => {
        const index = users.findIndex(user => user.email == email)
        const result = [...users]
        try {
            await axiosClient.post('auth/activate', { email })
            result[index].is_active = 1
            setUsers(result)
            toast.success(email + ' successfully activated')
        } catch (err) {
            console.log(err?.data)
            toast.error('activation failed')
        }
        // console.log(result[index])
    }
    const nextPage = () => setPage(page + 1)
    const prevPage = () => setPage(page - 1)
    return { users, nextPage, prevPage, isLoading, error, meta: data?.meta, links: data?.links, activateUser }
}

export default useUsers
