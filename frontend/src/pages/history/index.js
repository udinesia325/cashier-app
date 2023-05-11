import Icon from '@/components/Icon'
import { HistoryContext } from '@/components/Layout'
import Paginator from '@/components/Paginator'
import useHistories from '@/hooks/useHistories'
import React, { useContext } from 'react'

function Index() {
    const { histories, prevPage, nextPage, meta, links } = useHistories()
    const { setActiveHistory } = useContext(HistoryContext)
    return (
        <div className='px-1 md:px-3 w-full'>
            <h1 className='text-4xl font-semibold mt-6 mb-4'>History Order</h1>
            <table className='table'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th>N</th>
                        <th className='td-line-clamp'>ID</th>
                        <th>Subtotal</th>
                        <th>Pay</th>
                        <th>Change</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {histories?.map((history, i) => (
                        <tr className='bg-white' key={history.invoice_id}>
                            <td>{i + 1}</td>
                            <td className='td-line-clamp'>{history.invoice_id}</td>
                            <td>{history?.subtotal.toLocaleString('id')}</td>
                            <td>{history?.pay.toLocaleString('id')}</td>
                            <td>{history?.change.toLocaleString('id')}</td>
                            <td>
                                <Icon name="receipt_long" className="p-2 rounded-full text-white bg-green-600" onClick={() => setActiveHistory(history)} />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Paginator links={links} meta={meta} prevPage={prevPage} nextPage={nextPage} />
        </div>
    )
}

export default Index
