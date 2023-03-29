import React, { useState } from 'react'

export default function Login() {
    const [body, setBody] = useState({
        email: "",
        password: ""
    })
    const onChange = (e) => {
        setBody(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(body)
    }
    return (
        <div className='w-full h-screen flex'>
            <form className='w-96 h-max shadow-md shadow-gray-200 rounded-sm m-auto -translate-y-32 flex flex-col gap-y-3 items-center px-3 py-4' onSubmit={handleSubmit}>
                <h1 className='text-center font-semibold text-3xl'>Cashier App</h1>
                <RenderField label="Email" type="email" value={body} onChange={onChange} />
                <RenderField label="Password" type="password" value={body} onChange={onChange} />
                <button type="submit" className='bg-primary text-white py-2 w-40 font-semibold rounded-sm'>Login</button>
            </form>
        </div>
    )
}
function RenderField({ label, type, value, onChange }) {
    return (
        <label>
            <span className='text-gray-800 tracking-wide'>{label}</span><br />
            <input type={type || "text"} className="outline-none px-2 py-1 text-2xl rounded-sm border border-gray-100 focus:border-gray-400" name={label.toLowerCase()} value={value[label]} onChange={onChange} />
        </label>)
}
