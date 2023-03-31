import Card from '@/components/Card'
import Heading from '@/components/Heading'
import axiosInstance from '@/features/axiosInstance'
import { store } from '@/features/store'
import useAuth from '@/hooks/useAuth'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  const auth = useAuth()
  useEffect(() => {
    if (auth.access_token) {
      axiosInstance.get("/products").then(data => {
        console.log(data)
      })
    }
  }, [auth])
  console.log(store.getState().auth.access_token)

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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </>
  )
}
