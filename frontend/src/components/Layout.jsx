import React from 'react'
import Invoice from '@/components/Invoice'
import Sidebar from '@/components/Sidebar'
import Main from '@/components/Main'

export default function Layout({ children }) {
    return (
        <div className='flex h-screen min-w-full'>
            <Sidebar />
            <Main>{children}</Main>
            <Invoice />
        </div>
    )
}
