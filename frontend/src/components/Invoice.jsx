import React from 'react'
import CardInvoiceItem from './CardInvoiceItem'
import InvoiceBill from './InvoiceBill'

export default function Invoice() {
  return (
    <>
      <h1 className='text-xl font-semibold mt-10 '>Pesanan</h1>
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
      {/* input pembayaran */}
      <input type="number" placeholder='Bayar' className='text-lg py-1 px-2 outline-none font-semibold mt-4 mb-2 border border-gray-300' />
      {/* invoice bill */}
      <InvoiceBill />
      {/* button to payment */}
      <button className='bg-primary font-semibold text-white py-2 my-5 hover:bg-opacity-90'>Selesaikan Pembayaran</button>
    </>
  )
}
