import React from 'react'

export default function InvoiceBill() {
    return (
        <div className='bg-gray-100 min-h-[100px] h-[20%] max-h-[300px] mt-4 flex flex-col  font-semibold px-3 pt-3 gap-y-2 text-gray-500 pb-3'>
            <div className='flex-1 flex flex-row justify-between'>
                <span>Subtotal</span>
                <span>Rp. 10.000</span>
            </div>
            <div className='flex-1 flex flex-row justify-between'>
                <span>Tunai</span>
                <span>Rp. 10.000</span>
            </div>
            <div className='flex-1 flex flex-row justify-between'>
                <span>Kembali</span>
                <span>Rp. 10.000</span>
            </div>
            <div className='flex-1 flex flex-row justify-between border pt-3 border-t-gray-500 border-dashed'>
                <span>Total</span>
                <span>Rp. 10.000</span>
            </div>

        </div>
    )
}
