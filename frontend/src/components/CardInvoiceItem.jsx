import React from 'react'
import Icon from './Icon'

export default function CardInvoiceItem() {
    return (
        <div className='grid grid-rows-2 grid-cols-3 '>
            <img src="https://source.unsplash.com/200x200" alt="" className='aspect-square w-3/4 col-span-1 row-span-2 rounded-md' />
            <h1 className='col-span-2 font-semibold my-auto'>Nama Makanan</h1>
            <span className='col-span-1 my-auto font-bold text-primary'>Rp. 14000</span>
            <div className='col-span-1 my-auto pr-3 flex justify-between items-center'>
                <button className='bg-primary flex items-center justify-center p-[1px] rounded-sm disabled:bg-opacity-50'><Icon name="remove" className="text-white" /></button>
                <span className='font-semibold'>1</span>
                <button className='bg-primary flex items-center justify-center p-[1px] rounded-sm'><Icon name="add" className="text-white" /></button>
            </div>
        </div>
    )
}