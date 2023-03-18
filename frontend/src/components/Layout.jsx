import React from 'react'
import Invoice from '@/components/Invoice'
import Sidebar from '@/components/Sidebar'
import Main from '@/components/Main'
import { useRouter } from 'next/router'
import AddProduct from './AddProduct'

export default function Layout({ children }) {
    const { pathname } = useRouter()
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
