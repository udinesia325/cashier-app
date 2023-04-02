import React, { useState } from 'react'

export default function AddProduct() {
    const [body, setBody] = useState({
        name: '',
        price: ''
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
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <>
            <h1 className='text-center text-3xl font-semibold mt-4 mb-5'>Tambah Barang</h1>
            <form action="" className='w-full flex flex-col mt-4 gap-5' onSubmit={handleSubmit}>
                <Field name={"name"} type="text" placeholder="Nama Barang" value={body.name} handleChange={handleChange} />
                <Field name={"price"} type="number" placeholder="Harga" value={body.price} handleChange={handleChange} />
                <label htmlFor="image" className='text-sm text-gray-400'>disarankan menggunakan gambar dengan aspek rasio 1/1</label>
                <input type="file" id='image' accept='image/*' className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:bg-opacity-10 file:text-primary
      hover:file:bg-blue-100
    "
                    onChange={handleImage}
                />
                {image && (
                    <img src={image} alt="" className='aspect-square w-full' />
                )}
                <div className="flex w-full gap-2 mt-10  justify-center text-white font-semibold">
                    <button className='flex-1 py-2 transition-colors bg-red-500 hover:bg-red-300' type="reset" onClick={() => setImage(null)}>reset</button>
                    <button className='flex-1 py-2 transition-colors bg-green-500 hover:bg-green-300' type="submit">Kirim</button>
                </div>
            </form>
        </>
    )
}
function Field({ name, placeholder, type, value, handleChange }) {
    return (
        <input type={type} placeholder={placeholder || name} name={name} value={value} onChange={handleChange} className='text-lg py-1 px-2 outline-none font-semibold border border-gray-300' />

    )
}