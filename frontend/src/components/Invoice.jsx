import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import CardInvoiceItem from './CardInvoiceItem'
import Icon from './Icon'
import InvoiceBill from './InvoiceBill'
import { HideContext } from './Layout'

export default function Invoice() {
  const { hide, setHide } = useContext(HideContext)
  const invoiceState = useSelector(state => state.invoice)
  return (
    <>
      <h1 className='text-xl font-semibold mt-2 md:mt-10 '>Pesanan</h1>
      <Icon name="clear" className="absolute text-[#bbb] right-6 top-4 md:hidden" onClick={() => setHide(!hide)} />
      {/* Card invoice */}
      <div className='md:flex-1 flex flex-col gap-y-4 mt-5 h-[290px] md:min-h-[200px] md:max-h-[50%] overflow-auto'>
        {invoiceState.products.length == 0 ?
          <h1 className="font-semibold text-center">Tidak Ada Item</h1>
          : null}
        {invoiceState.products.map(product => (
          <CardInvoiceItem key={product.uuid} {...product} />
        ))}
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
