import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'

import Head from 'next/head'

const FindMap = dynamic(() => import('components/Map/FindMap'), {ssr: false})

export default function Location() {
    const router = useRouter()
    console.log(JSON.parse(router.query))
    return (
        <>
            <Head>
                <title>Lokasi</title>
            </Head>
            <main>
                <FindMap/>
            </main>
        </>
    )
}