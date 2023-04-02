import Card from '@/components/Card'
import Heading from '@/components/Heading'
import { useGetProductsQuery } from '@/features/api/productsApi'
import { setProducts } from '@/features/slices/productsSlice'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'


export default function Home() {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetProductsQuery()

  if (data?.length && !isLoading) {
    dispatch(setProducts(data))
  }
  return (
    <>
      <Head>
        <title>E - Cashier</title>
        <meta name="description" content="Kelola pembayaran" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading />
        <div className="container flex flex-wrap pl-6 gap-y-3 gap-x-2 cursor-pointer">
          {isLoading && <h1 className="text-center text-2xl font-semibold">Loading ...</h1>}
          {data?.length && data.map(d => (
            <Card key={d.uuid} name={d.name} price={d.price} image={`http://localhost:8000/${d.image}`} />
          ))}
        </div>
      </main>
    </>
  )
}
