import axiosClient from '@/features/axiosClient'
import { addProducts } from '@/features/slices/productsSlice'
import React, { useContext, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Icon from './Icon'
import { HideContext } from './Layout'

const initialError = {
    name: [],
    image: [],
    price: [],
}
export default function AddProduct() {
    const toggleHide = useContext(HideContext)
    const imageRef = useRef(null)
    const dispatch = useDispatch()
    const messageRef = useRef(null)
    const [body, setBody] = useState({
        name: '',
        price: ''
    })
    const [error, setError] = useState({
        ...initialError
    })
    const handleChange = (event) => {
        const { name, value } = event.target
        setBody({
            ...body,
            [name]: value
        })

    }
    const [image, setImage] = useState(null)
    const handleImage = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
    }
    const handleReset = () => {
        setImage(null)
        setBody({ name: '', price: '' })
        setError(initialError)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("name", body.name)
        formData.append("price", body.price)
        formData.append("image", imageRef.current.files[0])

        messageRef.current.innerHTML = ""
        try {
            const response = await axiosClient.post("products", formData, {
                headers: {
                    "Content-Type": "multipart/formdata",
                    Accept: "application/json"
                }
            })
            if (response.status >= 400) throw response.data
            setError(initialError)
            messageRef.current.innerHTML = response.data.message
            handleReset()
            dispatch(addProducts(response.data.data))
            console.log(response)
        } catch (error) {
            console.log(error)
            setError({
                ...initialError,
                ...error.errors
            })
        }

    }
    return (
        <>
            <Icon name="clear" className="absolute md:hidden text-[#bbb] right-3 top-6" onClick={toggleHide} />
            <h1 className='text-center text-3xl font-semibold mt-4 mb-5'>Add New Product</h1>

            <span className='text-sm text-center text-green-400' ref={messageRef}></span>
            <form action="" className='w-full flex flex-col mt-4 gap-5' onSubmit={handleSubmit}>
                <Field name={"name"} type="text" placeholder="Product Name" value={body.name} handleChange={handleChange} error={error} />
                <Field name={"price"} type="number" placeholder="Price" value={body.price} handleChange={handleChange} error={error} />
                <label htmlFor="image" className='text-sm text-gray-400'>The best image ratio is 1/1</label>
                <input type="file" ref={imageRef} id='image' accept='image/*' className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:bg-opacity-10 file:text-primary
      hover:file:bg-blue-100
    "
                    onChange={handleImage}
                />
                <span className='text-xs text-red-400'>{error.image.join(" and ")}</span>
                {image && (
                    <img src={image} alt="" className='aspect-square w-full' />
                )}
                <div className="flex w-full gap-2 mt-10  justify-center text-white font-semibold">
                    <button className='flex-1 py-2 transition-colors bg-red-500 hover:bg-red-300' type="reset" onClick={handleReset}>reset</button>
                    <button className='flex-1 py-2 transition-colors bg-green-500 hover:bg-green-300' type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}
function Field({ name, placeholder, type, value, handleChange, error }) {
    return (
        <label className='block w-full'>
            <input type={type} placeholder={placeholder || name} name={name} value={value} onChange={handleChange} className='text-lg py-1 px-2 outline-none font-semibold border border-gray-300 w-full' />
            <span className='text-xs text-red-400'>{error[name]}</span>
        </label>

    )
}
