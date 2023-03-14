import { BookmarkBorderOutlined, DashboardOutlined, DonutSmallOutlined, HomeOutlined, LogoutOutlined, SettingsOutlined } from '@mui/icons-material'
import React from 'react'
import NavLink from './NavLink'

export default function NavItem() {
    return (
        <>
            <ul className='flex flex-col gap-y-6 mt-12'>
                <NavLink Icon={HomeOutlined} active="/" />
                <NavLink Icon={DashboardOutlined} active="/dashboard" />
                <NavLink Icon={DonutSmallOutlined} active="/rekapan" />
                <NavLink Icon={BookmarkBorderOutlined} active="/history" />
            </ul>
            <ul className='mt-auto flex flex-col gap-y-6 mb-10'>
                <NavLink Icon={SettingsOutlined} active="setting" />
                <NavLink Icon={LogoutOutlined} active="logout" />
            </ul>
        </>
    )
}
