import React from 'react'

export default function Card() {
  return (
    <div className='bg-white w-[200px] h-[280px] rounded-md p-2 flex flex-col'>
        <img src="https://source.unsplash.com/200x200" alt="" className='aspect-[6/5] rounded-sm' />
        <h1 className='font-semibold'>Nama Makanan</h1>
        <p className='font-semibold text-xs text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel.</p>
        <h3 className='text-xl mt-auto mb-3  font-semibold text-primary'>Rp. 40.000</h3>
    </div>
  )
}
