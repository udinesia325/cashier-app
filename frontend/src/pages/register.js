import Icon from '@/components/Icon'
import axiosClient from '@/features/axiosClient'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Register() {
    const router = useRouter()
    const [body, setBody] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const onChange = (e) => {
        setBody(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        setMessage('')
        try {
            const response = await axiosClient.post("/auth/register", body)
            setIsLoading(false)
            toast.success(response.data?.message)
            router.push("/login")
        } catch (e) {
            setIsLoading(false)
            toast.error(e.data?.message)
            setErrors(e.data.errors)
        }
    }
    return (
        <div className='w-full h-screen flex'>
            <form className='w-96 h-max shadow-md shadow-gray-200 rounded-sm m-auto -translate-y-32 flex flex-col gap-y-3 items-center px-3 py-4' onSubmit={handleSubmit}>
                <h1 className='text-center font-semibold text-3xl'>Register</h1>
                <p className='text-red-400 text-sm'>{message}</p>
                <RenderField label="Name" type="text" value={body} onChange={onChange} message={errors?.name || ''} />
                <RenderField label="Email" type="email" value={body} onChange={onChange} message={errors?.email || ''} />

                <RenderPasswordField label="Password" value={body} onChange={onChange} message={errors?.password || ''} />
                <RenderPasswordField label="Password_confirmation" value={body} onChange={onChange} message={errors?.password_confirmation || ''} />
                <p className='text-sm self-start ml-4'>Already have an account ? <Link href="/login" className='text-primary font-semibold'>Login</Link> </p>
                <button type="submit" className='bg-primary text-white py-2 w-40 font-semibold rounded-sm disabled:bg-opacity-60 mt-6 mb-3' disabled={isLoading}>{isLoading ? "Loading ..." : "Submit"}</button>
            </form>
        </div >
    )
}
function RenderField({ label, type, value, onChange, message = "" }) {
    return (
        <label>
            <span className='text-gray-800 tracking-wide'>{label}</span><br />
            <input type={type || "text"} className="outline-none px-2 py-1 text-2xl rounded-sm border border-gray-100 focus:border-gray-400" name={label.toLowerCase()} value={value[label]} onChange={onChange} />
            <p className='text-red-400 text-xs'>{message}</p>
        </label>)
}
function RenderPasswordField({ label, value, onChange, message = "" }) {
    const [hide, setHide] = useState(true)
    return (
        <label className='relative'>
            <span className='text-gray-800 tracking-wide'>{label}</span><br />
            <input type={hide ? "password" : "text"} className="outline-none px-2 py-1 text-2xl rounded-sm border border-gray-100 focus:border-gray-400" name={label.toLowerCase()} value={value[label]} onChange={onChange} />
            <p className='text-red-400 text-xs'>{message}</p>
            <Icon name={hide ? "visibility_off" : "visibility"} className="absolute z-10 right-2 top-[33px]" onClick={() => setHide(!hide)} />
        </label>)
}
