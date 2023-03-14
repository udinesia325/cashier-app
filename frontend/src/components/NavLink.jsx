import { useRouter } from 'next/router';
import React from 'react'

export default function NavLink({ Icon, active = '' }) {
    const router = useRouter()
    const isActiveLink = router.pathname === active;
    const handleClick = () => {
        router.push(active)
    }
    return <li className={`flex items-center justify-center ${isActiveLink?"border-r-2 border-primary":""}`} onClick={handleClick}>{<Icon htmlColor={isActiveLink ? "#0ea5e9" : "#ccc"} />}</li>
}
