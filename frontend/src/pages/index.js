import Card from '@/components/Card'
import Heading from '@/components/Heading'
import Paginator from '@/components/Paginator'
import useProducts from '@/hooks/useProducts'
import Head from 'next/head'


export default function Home() {
  const { products, isLoading, prevPage, nextPage, meta, links } = useProducts()
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
        <Paginator links={links} meta={meta} prevPage={prevPage} nextPage={nextPage} />
      </main>
    </>
  )
}
