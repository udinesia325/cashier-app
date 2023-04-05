import { decrementQty, incrementQty, removeItem } from '@/features/slices/invoiceSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import Icon from './Icon'

const defaultImageUrl = "https://source.unsplash.com/random?food&200x200"
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function CardInvoiceItem({ uuid, name = "product", price = 0, image = defaultImageUrl, qty = 1 }) {
    const dispatch = useDispatch()
    const increment = () => dispatch(incrementQty({ uuid }))
    const decrement = () => dispatch(decrementQty({ uuid }))
    const handleDelete = () => {
        dispatch(removeItem(uuid))
    }
    return (
        <div className='grid grid-rows-2 grid-cols-3 relative'>
            {/* delete button*/}
            <button className='absolute top-0 right-3 bg-red-400 p-[1px]  rounded-sm flex'>
                <Icon name="delete" className="text-white m-auto" onClick={handleDelete} />
            </button>
            <img src={image != defaultImageUrl ? backendUrl + image : image} alt={`image - ${name}`} className='aspect-square w-3/4 col-span-1 row-span-2 rounded-md' />
            <h1 className='col-span-2 font-semibold my-auto'>{name}</h1>
            <span className='col-span-1 my-auto font-bold text-primary'>Rp. {price.toLocaleString("id")}</span>
            <div className='col-span-1 my-auto pr-3 flex justify-between items-center'>
                <button className='bg-primary flex items-center justify-center p-[1px] rounded-sm disabled:bg-opacity-50' disabled={qty == 1} onClick={decrement}><Icon name="remove" className="text-white" /></button>
                <span className='font-semibold'>{qty}</span>
                <button className='bg-primary flex items-center justify-center p-[1px] rounded-sm' onClick={increment}><Icon name="add" className="text-white" /></button>
            </div>
        </div>
    )
}
