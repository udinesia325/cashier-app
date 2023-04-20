import Card from '@/components/Card'
import Heading from '@/components/Heading'
import Icon from '@/components/Icon'
import useProducts from '@/hooks/useProducts'
import Head from 'next/head'


export default function Home() {
  const { products, isLoading, prevPage, nextPage, meta, links } = useProducts()
  console.log({ meta, links })
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
        <div className="container grid grid-cols-2 justify-start md:flex md:flex-wrap px-1 md:pl-6 gap-y-3 gap-x-1 md:gap-x-2 cursor-pointer">
          {isLoading && <h1 className="text-center text-2xl font-semibold">Loading ...</h1>}
          {products?.length && products.map(d => (
            <Card key={d.uuid} uuid={d.uuid} name={d.name} price={d.price} image={d.image} />
          ))}
        </div>

        {/* paginator */}
        <div className='w-[90%] max-w-md bg-white rounded-sm m-auto flex justify-center items-center mt-3 p-2 gap-x-2'>
          {links?.prev ?
            <Icon name="arrow_forward_ios" onClick={prevPage} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md rotate-180" />
            : null}
          <h1 className='my-auto mx-2 font-semibold text-2xl'>{meta.current_page}</h1>
          {links?.next ?
            <Icon name="arrow_forward_ios" onClick={nextPage} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md" />
            : null}

        </div>
      </main>
    </>
  )
}
