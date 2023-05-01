import { updateProducts } from '@/features/slices/productsSlice'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from './Icon'

const initialError = {
    name: [],
    image: [],
    price: [],
}
// setBody hanya untuk reset body agar component ini tertutup
export default function EditProduct({ editBody, closeEdit }) {
    const imageRef = useRef(null)
    const dispatch = useDispatch()
    const { update } = useSelector(state => state.products)
    const messageRef = useRef(null)
    const [body, setBody] = useState({
        name: editBody?.name,
        price: editBody?.price,
    })
    const error = update.errors
    const handleChange = (event) => {
        const { name, value } = event.target
        setBody({
            ...body,
            [name]: value
        })

    }
    const initialImage = process.env.NEXT_PUBLIC_BACKEND_URL + editBody.image
    const [image, setImage] = useState(initialImage)
    const handleImage = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
    }
    const handleReset = () => {
        setImage(initialImage)
        setBody({ name: '', price: '' })
        setError(initialError)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("_method", "PUT")
        formData.append("name", body.name)
        formData.append("price", body.price)
        if (image != initialImage) {
            formData.append("image", imageRef.current.files[0])
        }
        dispatch(updateProducts({ uuid: editBody.uuid, formData }))
    }

    return (
        <div className='bg-white absolute z-50 top-0 bottom-0 right-0 left-0 px-5'>
            <Icon name="clear" className="absolute  text-[#bbb] right-3 top-6" onClick={closeEdit} />
            <h1 className='text-center text-3xl font-semibold mt-4 mb-5'>Edit Product</h1>

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
                <span className='text-xs text-red-400'>{error?.image?.join(" and ")}</span>
                {image && (
                    <img src={image} alt="" className='aspect-square w-full' />
                )}
                <div className="flex w-full gap-2 mt-10  justify-center text-white font-semibold">
                    <button className='flex-1 py-2 transition-colors bg-red-500 hover:bg-red-300' type="reset" onClick={handleReset}>reset</button>
                    <button className='flex-1 py-2 transition-colors bg-green-500 hover:bg-green-300' type="submit" disabled={update.isLoading}>{update.isLoading ? "Loading ..." : "Submit"}</button>
                </div>
            </form>
        </div>
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
