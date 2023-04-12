import { resetItem } from '@/features/slices/invoiceSlice'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

function ModalInvoice({ products, subtotal = 0, pay = 0, change = 0, uuid, setUuid, submitInvoice, setShowBill }) {
    const contentRef = useRef(null)
    const dispatch = useDispatch()
    const handleExport = async () => {
        const canvas = await html2canvas(contentRef.current, { imageTimeout: 0 })
        const img = canvas.toDataURL("image/png")
        const pdf = new jsPDF()
        pdf.addImage(img, 'JPEG', 10, 0)
        pdf.save(`${uuid}.pdf`)
    }
    const handleCancel = () => {
        if (uuid) {
            dispatch(resetItem())
            setUuid('')
        }
        setShowBill(false)
    }
    return (
        <div className="absolute z-10 bg-gray-500 bg-opacity-30 backdrop-blur-sm top-0 bottom-0 right-0 left-0 flex overflow-y-auto">
            <div className='w-[300px] min-h-[90%] md:min-h-[50%] m-auto bg-white rounded-md p-5 flex flex-col' ref={contentRef}>
                <h1 className='text-center text-2xl font-semibold'>Brand Here</h1>
                <p className='text-sm font-semibold text-center'>Street flower123 block 12 Malang Indonesia</p>
                <hr />
                <p>id: {uuid || "auto-generate"}</p>
                <table className="text-sm w-full border-collapse border border-black">
                    <tbody>
                        <tr>
                            <td className='border border-black px-2'>Name</td>
                            <td className='border border-black px-2'>Qty</td>
                            <td className='border border-black px-2'>Price</td>
                        </tr>
                        {products.map((product, _i) => (
                            <tr key={_i}>
                                <td className='border border-black p-2'>{product.name}</td>
                                <td className='border border-black text-center'>{product.qty}</td>
                                <td className='border border-black px-2'>{product.price.toLocaleString('id')}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className=' p-2'>Subtotal</td>
                            <td className='text-center font-semibold'>:</td>
                            <td className='border border-black p-2'>{subtotal.toLocaleString('id')}</td>
                        </tr>
                        <tr className='border border-black'>
                            <td className=' p-2'>Pay</td>
                            <td className='text-center font-semibold'>:</td>
                            <td className='border border-black p-2'>{pay.toLocaleString('id')}</td>
                        </tr>
                        <tr>
                            <td className=' p-2'>Change</td>
                            <td className='text-center font-semibold'>:</td>
                            <td className='border border-black p-2'>{change.toLocaleString('id')}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='grid grid-col-2 gap-1 mt-auto text-white' data-html2canvas-ignore>
                    <button className={`bg-yellow-500 p-2 rounded-sm ${uuid ? "" : "hidden"}`} onClick={handleExport}>Download</button>
                    <button className={`bg-green-500 p-2  rounded-sm col-span-${uuid ? '1' : '2'}`} onClick={submitInvoice}>Save</button>
                    <button className=' col-span-2 p-2 rounded-sm bg-red-500 ' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ModalInvoice
