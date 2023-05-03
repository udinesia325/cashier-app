import formatNumber from '@/utils/formatNumber'
import React, { useContext } from 'react'
import { renderField } from './InvoiceBill'
import { HistoryContext } from './Layout'

function DetailHistory() {
    const { activeHistory, setActiveHistory } = useContext(HistoryContext)

    // jika tidak ada history terpilih maka return null
    if (!activeHistory.pay) return null
    return (
        <div className='bg-gray-100  mt-20 mb-3 flex flex-col gap-y-3 font-semibold p-2  text-gray-500'>
            <p className='line-clamp-1'>id : {activeHistory.invoice_id}</p>
            {activeHistory.invoice.data.map((inv, _i) => (
                renderField(`${inv.name} | ${inv.qty} x ${formatNumber(inv.price)}`, inv.price * inv.qty)
            ))}
            <div className='flex flex-col gap-y-2 border border-transparent border-t-gray-400 border-dashed mt-auto'>
                <p>Subtotal : Rp. {formatNumber(activeHistory.subtotal)}</p>
                <p>Pay : Rp. {formatNumber(activeHistory.pay)}</p>
                <p>Change : Rp. {formatNumber(activeHistory.change)}</p>
                <p className='text-sm'>created at : {new Date(activeHistory.created_at).toLocaleString("id", { day: "numeric", month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
            </div>
        </div>
    )
}

export default DetailHistory
//                <p key={_i}>{inv.name} : {inv.qty} @ {inv.price.toLocaleString('id')}</p>
