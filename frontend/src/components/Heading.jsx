import React, { useContext } from 'react'
import Icon from './Icon'
import { HideContext } from './Layout'

export default function Heading() {
  const toggleHide = useContext(HideContext)
  return (
    <div className='w-full px-3 flex flex-col md:flex-row min-h-[200px]'>
      <div className='relative flex-1 md:pl-9'>
        <h1 className='text-lg md:text-3xl font-semibold mt-10'>Welcome , Name</h1>
        <p className='font-medium text-sm text-gray-600'>Discover whatever you need easily</p>
        <Icon name="shopping_cart" className="absolute md:hidden text-[#bbb] right-3 top-6" onClick={toggleHide} />
      </div>
      <div className='flex-1 '>
        <label htmlFor="search" className='bg-white flex w-full md:w-2/4 min-w-[250px] justify-center pl-3 items-center rounded-md mt-12 mx-auto md:ml-auto md:mr-11'>
          <Icon name="search" />
          <input type="text" id='search' className='flex-1 text-lg py-1 px-2 outline-none font-semibold' placeholder='Cari ...' />
        </label>
      </div>
    </div>
  )
}
