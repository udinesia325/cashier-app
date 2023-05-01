import React from 'react'
import Icon from './Icon'

function Paginator({ links, meta, prevPage, nextPage }) {
    return (
        <div className='w-[90%] max-w-md bg-white rounded-sm m-auto flex justify-center items-center mt-3 p-2 gap-x-2'>
            {links?.prev ?
                <Icon name="arrow_forward_ios" onClick={prevPage} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md rotate-180" />
                : null}
            <h1 className='my-auto mx-2 font-semibold text-2xl'>{meta?.current_page}</h1>
            {links?.next ?
                <Icon name="arrow_forward_ios" onClick={nextPage} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md" />
                : null}

        </div>
    )
}

export default Paginator
