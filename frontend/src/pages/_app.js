import Layout from '@/components/Layout'
import { persistor, store } from '@/features/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position='top-center' />
        </Layout>
      </PersistGate>
    </Provider>
  )
}
