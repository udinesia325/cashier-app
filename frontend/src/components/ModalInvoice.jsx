import React from 'react'

function ModalInvoice({ products, subtotal = 0, pay = 0, change = 0, uuid, submitInvoice, setShowBill }) {
    return (
        <div className="absolute z-10 bg-gray-500 bg-opacity-30 backdrop-blur-sm top-0 bottom-0 right-0 left-0 flex overflow-y-auto">
            <div className='w-[90%] min-h-[90%] m-auto bg-white rounded-md p-5 flex flex-col'>
                <h1 className='text-2xl font-semibold my-3'>Invoice Bill</h1>
                <div className='grid grid-cols-3 justify-between font-semibold'>
                    <span className='text-gray-600 col-span-3 border border-transparent border-b-gray-400 border-dashed mb-6'>id order : {uuid || "auto generate"}</span>
                    {products.map((product, _i) => (
                        renderField(product.name, `${product.qty} x ${product.price.toLocaleString('id')}`)
                    ))}

                    <span className='text-gray-600 col-span-3 border border-transparent border-b-gray-400 border-dashed mt-10'></span>
                    {renderField("Pay", "Rp. " + Number(pay).toLocaleString("id"))}
                    {renderField("Change", "Rp. " + change.toLocaleString("id"))}
                    {renderField("Subtotal", "Rp. " + subtotal.toLocaleString("id"))}
                </div>
                <div className='grid grid-cols-3 justify-between font-semibold'>
                </div>
                <div className='grid grid-col-2 gap-1 mt-auto text-white'>
                    <button className='bg-yellow-500 p-2 rounded-sm'>Download</button>
                    <button className='bg-green-500 p-2 rounded-sm' onClick={submitInvoice}>Save</button>
                    <button className=' col-span-2 p-2 rounded-sm bg-red-500 ' onClick={() => setShowBill(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ModalInvoice

function renderField(left, right) {
    return (<>
        <span className='col-span-2'>{left}</span>
        <span>{right}</span>
    </>)
}
