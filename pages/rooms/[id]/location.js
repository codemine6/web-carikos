import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import styles from 'styles/roomLocation.module.css'

import Head from 'next/head'

const FindMap = dynamic(() => import('components/Map/FindMap'), {ssr: false})

export default function Location() {
    const [myPosition, setMyPosition] = useState()
    const router = useRouter()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setMyPosition([coords.latitude, coords.longitude])
        }, () => console.log('Please enable location for this page!'))
    }, [])

    return (
        <>
            <Head>
                <title>Lokasi</title>
            </Head>
            <main>
                <div className={styles.map}>
                    <FindMap
                        roomPosition={[router.query.latitude, router.query.longitude]}
                        myPosition={myPosition}
                    />
                </div>
            </main>
        </>
    )
}