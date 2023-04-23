import Box from '@/components/Box'
import Card from '@/components/Card'
import EditProduct from '@/components/EditProduct'
import Icon from '@/components/Icon'
import { HideContext } from '@/components/Layout'
import useProducts from '@/hooks/useProducts'
import Head from 'next/head'
import { createContext, useState } from 'react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'

export const EditContext = createContext(null)

export default function Index() {
    const toggleHide = useContext(HideContext)
    const { products, isLoading, prevPage, nextPage, meta, links } = useProducts()

    // payload for edit data

    const [body, setBody] = useState({
        uuid: '',
        name: '',
        price: '',
        image: ''
    })
    const closeEdit = () => {
        setBody({ uuid: '' })
    }
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className='min-h-full relative'>
                <Icon name="post_add" className="absolute md:hidden text-[#bbb] right-3 top-6" onClick={toggleHide} />
                <div className="flex flex-wrap gap-5 w-full py-20 pl-3 md:pl-6 pr-3">
                    <Box iconName="fact_check" title="Barang tersimpan" total={50} />
                    <Box iconName="people_alt" title="Anggota" total={21} />
                </div>

                {body.uuid && <EditProduct editBody={body} closeEdit={closeEdit} />}
                <div className="container grid grid-cols-2 justify-start md:flex md:flex-wrap px-1 md:pl-6 gap-y-3 gap-x-1 md:gap-x-2 cursor-pointer">
                    {products?.length && products.map(d => (
                        <Card key={d.uuid} uuid={d.uuid} name={d.name} price={d.price} image={d.image} editable={true} setBody={setBody} />
                    ))}
                </div>


                {/* paginator */}
                <div className='w-[90%] max-w-md bg-white rounded-sm m-auto flex justify-center items-center mt-3 p-2 gap-x-2'>
                    {links?.prev ?
                        <Icon name="arrow_forward_ios" onClick={prevPage} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md rotate-180" />
                        : null}
                    <h1 className='my-auto mx-2 font-semibold text-2xl'>{meta?.current_page}</h1>
                    {links?.next ?
                        <Icon name="arrow_forward_ios" onClick={nextPage} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md" />
                        : null}

                </div>
            </div>
        </>
    )
}
