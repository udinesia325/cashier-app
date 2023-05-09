import { addItem } from '@/features/slices/invoiceSlice'
import { deleteProducts } from '@/features/slices/productsSlice'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Icon from './Icon'

const defaultImageUrl = "https://source.unsplash.com/random?food&200x200"
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
export default function Card({ name = "", uuid, price = 0, editable = false, image = defaultImageUrl, setBody }) {
  const dispatch = useDispatch()
  const addToCart = () => {
    dispatch(addItem({
      uuid, name, price, image
    }))
  }
  const deleteItem = () => {
    dispatch(deleteProducts(uuid))
  }
  const editItem = () => {
    setBody({ uuid, name, price, image })
  }
  return (
    <div className={`bg-white w-full md:w-[200px] h-[${editable ? "300" : "280px"}] rounded-md p-2 flex flex-col relative`}>
      <img src={image == null ? defaultImageUrl : image != defaultImageUrl ? backendUrl + image : image} alt={`image ${name}`} className='aspect-[6/5] rounded-sm' />
      <h1 className='font-semibold'>{name}</h1>
      <h3 className='text-xl mt-auto mb-3  font-semibold text-primary'>Rp. {price.toLocaleString("id")}</h3>
      <button className='bg-white bg-opacity-50 p-1 absolute right-3 top-3 rounded-md transition-all duration-200 hover:bg-opacity-70 hover:rounded-sm' onClick={addToCart}>
        <Icon name="shopping_cart" className="text-primary" />
      </button>
      {editable && (
        <div className='flex w-full gap-2 text-white'>
          <button className='flex-1 py-1 transition-colors rounded-sm bg-yellow-400 hover:bg-yellow-300' onClick={editItem}><Icon name="edit" /></button>
          <button className='flex-1 py-1 transition-colors rounded-sm bg-red-400 hover:bg-red-300' onClick={deleteItem}><Icon name="delete" /></button>
        </div>
      )}
    </div>
  )
}
