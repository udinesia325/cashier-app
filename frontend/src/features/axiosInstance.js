import axios from "axios"
import { store } from "./store"
import { resetUser, setToken } from "./slices/authSlice"

export const baseUrl = "http://localhost:8000/api"

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const refreshToken = async () => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {}, {
            headers: {
                Authorization: `Bearer ${store.getState().auth.access_token}`
            }
        })
        const token = response.data.data.access_token
        store.dispatch(setToken(token))
        return token
    } catch (error) {
        if (process.env.NODE_ENV == "development") {
            console.log({ error })
        }
        if (error.response.data.message == "token expired") {
            store.dispatch(resetUser())
        }
    }
}

axiosInstance.interceptors.request.use(
    config => {
        const token = store.getState().auth.access_token
        config.headers['Authorization'] = `Bearer ${token}`
        return config
    },
    error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const prevReq = error?.config
        if (error.response.status == 401 && !prevReq.sent) {
            prevReq.sent = true
            const token = await refreshToken()
            prevReq.headers.Authorization = `Bearer ${token}`
            store.dispatch(setToken(token))
            return axiosInstance(prevReq)

        }
        return axiosInstance.interceptors.response.eject(error)
    }
)

export default axiosInstance
