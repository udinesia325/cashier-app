import Box from '@/components/Box'
import Card from '@/components/Card'
import EditProduct from '@/components/EditProduct'
import Icon from '@/components/Icon'
import { HideContext } from '@/components/Layout'
import Head from 'next/head'
import { createContext, useState } from 'react'
import { useContext } from 'react'
import { useSelector } from 'react-redux'

export const EditContext = createContext(null)

export default function Index() {
    const toggleHide = useContext(HideContext)
    const { products } = useSelector(state => state.products)

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


            </div>
        </>
    )
}
