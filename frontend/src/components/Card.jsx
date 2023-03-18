import { DeleteOutline, ModeEditOutline, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'

export default function Card({ editable = false }) {
  return (
    <div className={`bg-white w-[200px] h-[${editable ? "300" : "280px"}] rounded-md p-2 flex flex-col relative`}>
      <img src="https://source.unsplash.com/random?food&200x200" alt="" className='aspect-[6/5] rounded-sm' />
      <h1 className='font-semibold'>Nama Makanan</h1>
      <p className='font-semibold text-xs text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel.</p>
      <h3 className='text-xl mt-auto mb-3  font-semibold text-primary'>Rp. 40.000</h3>
      <button className='bg-white bg-opacity-50 p-1 absolute right-3 top-3 rounded-md transition-all duration-200 hover:bg-opacity-70 hover:rounded-sm'>
        <ShoppingCartOutlined htmlColor='#0ea5e9' />
      </button>
      {editable && (
        <div className='flex w-full gap-2'>
          <button className='flex-1 py-1 transition-colors rounded-sm bg-yellow-400 hover:bg-yellow-300'><ModeEditOutline htmlColor='white' /></button>
          <button className='flex-1 py-1 transition-colors rounded-sm bg-red-400 hover:bg-red-300'><DeleteOutline htmlColor='white' /></button>
        </div>
      )}
    </div>
  )
}
