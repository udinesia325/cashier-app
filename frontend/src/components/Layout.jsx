import React, { createContext, useEffect, useState } from 'react'
import Invoice from '@/components/Invoice'
import Sidebar from '@/components/Sidebar'
import Main from '@/components/Main'
import { useRouter } from 'next/router'
import AddProduct from './AddProduct'
import useAuth from '@/hooks/useAuth'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"
import DetailHistory from './DetailHistory'

export const HideContext = createContext(null)
export const HistoryContext = createContext(null)
export default function Layout({ children }) {
    const { pathname } = useRouter()
    const [hide, setHide] = useState(true)
    const [activeHistory, setActiveHistory] = useState({})
    const router = useRouter()
    const auth = useAuth()
    useEffect(() => {
        if (auth.name == '') {
            router.push("/login")
        }
    }, [pathname, auth])
    if (pathname == "/login") {
        if (auth.name) {
            router.push("/")
        }
        return children
    }
    const toggleHide = () => {
        setHide(!hide)
    }

    return (
        <HideContext.Provider value={toggleHide}>
            <HistoryContext.Provider value={{ activeHistory, setActiveHistory }}>
                <div className='flex h-screen min-w-full'>
                    <Sidebar />
                    <Main>{children}</Main>
                    {/* container */}
                    <div className={`${hide ? "hidden" : "flex absolute top-0 left-0 right-0 bottom-0"} bg-white md:flex-none md:flex flex-col md:w-96 px-4 min-h-screen max-h-screen overflow-y-auto`}>
                        {pathname == "/" && <Invoice />}
                        {pathname == "/dashboard" && <AddProduct />}
                        {pathname == "/history" && <DetailHistory />}
                    </div>
                </div>
                <ToastContainer position='top-center' />
            </HistoryContext.Provider>
        </HideContext.Provider>
    )
}
