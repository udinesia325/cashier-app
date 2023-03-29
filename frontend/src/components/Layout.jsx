import React, { useEffect } from 'react'
import Invoice from '@/components/Invoice'
import Sidebar from '@/components/Sidebar'
import Main from '@/components/Main'
import { useRouter } from 'next/router'
import AddProduct from './AddProduct'
import { getStorage } from '@/utils/storage'

export default function Layout({ children }) {
    const { pathname } = useRouter()
    const router = useRouter()
    useEffect(() => {
        if (getStorage("access_token") == null && pathname != "/login") {
            router.replace("/login")
        }
    }, [pathname])
    if (pathname == "/login") {
        return children
    }
    return (
        <div className='flex h-screen min-w-full'>
            <Sidebar />
            <Main>{children}</Main>
            {/* container */}
            <div className='flex-none flex flex-col w-96 px-4 max-h-screen overflow-y-auto'>
                {pathname == "/" && <Invoice />}
                {pathname == "/dashboard" && <AddProduct />}
            </div>

        </div>
    )
}
