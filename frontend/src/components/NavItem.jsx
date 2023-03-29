import React from 'react'
import NavLink from './NavLink'

export default function NavItem() {
    return (
        <>
            <ul className='flex flex-col gap-y-6 mt-12'>
                <NavLink IconName="home" active="/" />
                <NavLink IconName="dashboard" active="/dashboard" />
                <NavLink IconName="donut_small" active="/rekapan" />
                <NavLink IconName="bookmark" active="/history" />
            </ul>
            <ul className='mt-auto flex flex-col gap-y-6 mb-10'>
                <NavLink IconName="settings" active="setting" />
                <NavLink IconName="logout" active="logout" />
            </ul>
        </>
    )
}
