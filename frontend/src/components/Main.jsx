import React from 'react'

export default function Main({ children }) {
    return (
        <div className="flex-1 bg-gray-100 max-h-screen overflow-auto pb-10">
            {children}
        </div>
    )
}
