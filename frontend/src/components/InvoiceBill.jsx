import React from 'react'
import { useSelector } from 'react-redux'

export default function InvoiceBill() {
    const { subtotal, pay, change, total } = useSelector(state => state.invoice)
    return (
        <div className='bg-gray-100 h-[150px] mt-4 mb-3 flex flex-col gap-y-3 font-semibold p-2  text-gray-500'>
            {renderField('Subtotal', subtotal)}
            {renderField('Tunai', 10000)}
            {renderField('Kembali', change)}
            <div className='flex-1 flex flex-row justify-between border border-transparent border-t-gray-400 border-dashed'>
                <span>Total</span>
                <span>Rp. 10.000</span>
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
