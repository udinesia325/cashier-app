import Paginator from '@/components/Paginator'
import useAuth from '@/hooks/useAuth'
import useUsers from '@/hooks/useUsers'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function Users() {
    const auth = useAuth()
    const router = useRouter()
    const { users, prevPage, nextPage, meta, links, activateUser } = useUsers()
    useEffect(() => {
        if (auth.role != 'admin') {
            router.push("/")
        }
    }, [])
    return (
        <div className='px-2'>
            <h1 className='text-2xl font-semibold mt-6'>User Management</h1>
            <table className='table mr-auto max-w-xl'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th>N</th>
                        <th className='td-line-clamp'>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {users?.map((user, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.is_active == 1 ? <span className='p-1  font-semibold text-sm text-gray-400'>activated</span> : <button className='p-2 bg-primary text-white  rounded-md font-semibold text-sm' onClick={activateUser.bind(this, user.email)}>activate</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Paginator links={links} meta={meta} prevPage={prevPage} nextPage={nextPage} />
        </div>
    )
}

export default Users
