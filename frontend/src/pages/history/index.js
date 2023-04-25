import Paginator from '@/components/Paginator'
import useHistories from '@/hooks/useHistories'
import React from 'react'

function Index() {
    const { histories, prevPage, nextPage, meta, links } = useHistories()

    return (
        <div className='px-1 md:px-3 w-full'>
            <table className='table-auto w-full min-w-[368px] mt-24 mx-auto mb-24'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='p-3'>N</th>
                        <th className='p-3 max-w-[80px] text-ellipsis whitespace-nowrap overflow-hidden'>ID</th>
                        <th className='p-3'>Subtotal</th>
                        <th className='p-3'>Pay</th>
                        <th className='p-3'>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {histories?.map((history, i) => (
                        <tr className='bg-white' key={history.invoice_id}>
                            <td className='p-3'>{i + 1}</td>
                            <td className='p-3 max-w-[80px] text-ellipsis whitespace-nowrap overflow-hidden'>{history.invoice_id}</td>
                            <td className='p-3'>{history?.subtotal.toLocaleString('id')}</td>
                            <td className='p-3'>{history?.pay.toLocaleString('id')}</td>
                            <td className='p-3'>{history?.change.toLocaleString('id')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Paginator links={links} meta={meta} prevPage={prevPage} nextPage={nextPage} />
        </div>
    )
}

export default Index
