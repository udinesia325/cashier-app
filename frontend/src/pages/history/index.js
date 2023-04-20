import useHistories from '@/hooks/useHistories'
import React from 'react'
import useSWR from "swr"

function Index() {
    const data = useHistories()
    console.log(data)
    return (
        <div>Index</div>
    )
}

export default Index
