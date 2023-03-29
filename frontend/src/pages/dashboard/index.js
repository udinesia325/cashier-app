import Box from '@/components/Box'
import Card from '@/components/Card'
import Head from 'next/head'

export default function Index() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className='min-h-full'>
                <div className="flex flex-wrap gap-5 w-full py-20 pl-6">
                    <Box iconName="fact_check" title="Barang tersimpan" total={50} />
                    <Box iconName="people_alt" title="Anggota" total={21} />
                </div>
                <div className="container flex flex-wrap pl-6 gap-y-3 gap-x-2 cursor-pointer">
                    <Card editable={true} />

                </div>
            </div>
        </>
    )
}
