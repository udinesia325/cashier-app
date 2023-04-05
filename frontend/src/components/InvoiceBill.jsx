import { calculate } from '@/features/slices/invoiceSlice'
import React from 'react'
import { useSelector } from 'react-redux'

export default function InvoiceBill() {
    const { subtotal, pay, change } = useSelector(calculate)

    return (
        <div className='bg-gray-100 h-[150px] mt-4 mb-3 flex flex-col gap-y-3 font-semibold p-2  text-gray-500'>
            {renderField('Pay', pay || 0)}
            {renderField('Change', change)}
            <div className='flex flex-col gap-y-2 border border-transparent border-t-gray-400 border-dashed mt-auto'>
                {renderField('Subtotal', subtotal)}
            </div>
        </div>
    )
}
function renderField(label = "", jumlah = 0) {
    return <p>
        <span className='float-left'>{label} :</span>
        <span className='float-right'>Rp. {jumlah.toLocaleString('id')}</span>
    </p>

}
