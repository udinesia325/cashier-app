import { SearchOutlined } from '@mui/icons-material'
import React from 'react'

export default function Heading() {
  return (
    <div className='w-full flex min-h-[200px]'>
      <div className='flex-1 pt-10 pl-9'>
        <h1 className='text-2xl font-semibold'>Welcome , Name</h1>
        <p className='font-medium text-sm text-gray-600'>Discover whatever you need easily</p>
      </div>
      <div className='flex-1'>
        <label htmlFor="search" className='bg-white flex w-2/4 justify-center items-center pl-3 rounded-md mt-14 ml-6'>
            <SearchOutlined />
            <input type="text" id='search' className='flex-1 text-lg py-1 px-2 outline-none font-semibold' placeholder='Cari ...' />
        </label>
      </div>
    </div>
  )
}
