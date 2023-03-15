import React from 'react'
import CardInvoiceItem from './CardInvoiceItem'
import InvoiceBill from './InvoiceBill'

export default function Invoice() {
  return (
    <div className='flex-none flex flex-col w-96 px-3'>
      <h1 className='text-xl font-semibold mt-10 '>Current Order</h1>
      {/* Card invoice */}
      <div className='flex-1 flex flex-col gap-y-4 mt-5 min-h-[200px] max-h-[50%] overflow-auto'>
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
        <CardInvoiceItem />
      </div>

      {/* invoice bill */}
      <InvoiceBill />
      {/* button to payment */}
      <button className='mx-3 bg-primary font-semibold text-white py-2 mt-auto mb-3 hover:bg-opacity-90'>Selesaikan Pembayaran</button>
    </div>
  )
}
