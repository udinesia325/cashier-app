import { logout } from '@/features/slices/authSlice'
import useAuth from '@/hooks/useAuth'
import React from 'react'
import { useDispatch } from 'react-redux'
import Icon from './Icon'
import NavLink from './NavLink'

export default function NavItem() {
    const dispatch = useDispatch()
    const { access_token } = useAuth()
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
                <li className='flex justify-center items-center' onClick={() => dispatch(logout(access_token))}>
                    <Icon name="logout" className="text-[#ccc]" />
                </li>
            </ul>
        </>
    )
}
