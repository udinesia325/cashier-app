import axiosClient from '@/features/axiosClient'
import { calculate, setPay } from '@/features/slices/invoiceSlice'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardInvoiceItem from './CardInvoiceItem'
import Icon from './Icon'
import InvoiceBill from './InvoiceBill'
import { HideContext } from './Layout'
import ModalInvoice from './ModalInvoice'

export default function Invoice() {
  const toggleHide = useContext(HideContext)
  const invoiceState = useSelector(state => state.invoice)
  const { subtotal, pay, change } = useSelector(calculate)
  // ini khusus untuk selesai di save
  const [uuid, setUuid] = useState("")
  const [showBill, setShowBill] = useState(false)
  const dispatch = useDispatch()
  const handlePay = (e) => {
    dispatch(setPay(e.target.value))
  }
  const submitInvoice = async () => {
    const data = invoiceState.products.map(prod => {
      return {
        name: prod.name,
        price: prod.price,
        qty: prod.qty
      }
    })
    const body = { data: JSON.stringify(data), subtotal, pay, change }
    try {
      const response = await axiosClient.post("invoices", body)
      setUuid(response.data.data.uuid)
    } catch (error) {
      setShowBill(false)
      console.log({ error })
    }

  }
  return (
    <>
      <h1 className='text-xl font-semibold mt-2 md:mt-10 '>Pesanan</h1>
      <Icon name="clear" className="absolute text-[#bbb] right-6 top-4 md:hidden" onClick={toggleHide} />
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
      <input type="number" placeholder='Bayar' className='text-lg py-1 px-2 outline-none font-semibold mt-4 mb-2 border border-gray-300' value={invoiceState.pay} onChange={handlePay} />
      {/* invoice bill */}
      <InvoiceBill />
      {/* button to payment */}
      <button className='bg-primary font-semibold text-white py-2 my-5 hover:bg-opacity-90 disabled:bg-opacity-50' disabled={pay < subtotal || subtotal == 0} onClick={() => setShowBill(true)}>Selesaikan Pembayaran</button>
      {/*modal confirmation store invoice*/}
      {showBill && <ModalInvoice products={invoiceState.products} subtotal={subtotal} pay={pay} change={change} uuid={uuid} setUuid={setUuid} submitInvoice={submitInvoice} setShowBill={setShowBill} />}
    </>
  )
}
