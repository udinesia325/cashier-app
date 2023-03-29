import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import Icon from './Icon';

export default function NavLink({ IconName, active = '' }) {
    const router = useRouter()
    const isActiveLink = router.pathname === active

    return <li className={`flex items-center justify-center ${isActiveLink ? "border-r-2 border-primary" : ""}`}>
        <Link href={active}>{<Icon name={IconName} className={`${isActiveLink ? "text-[#0ea5e9]" : "text-[#ccc]"}`} />}</Link>
    </li>
}
