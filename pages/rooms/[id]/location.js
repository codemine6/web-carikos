import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import styles from 'styles/roomLocation.module.css'

import Head from 'next/head'
import Alert from 'components/Alert/Alert'

const FindMap = dynamic(() => import('components/Map/FindMap'), {ssr: false})

export default function Location() {
    const [myPosition, setMyPosition] = useState()
    const [alert, setAlert] = useState(false)
    const router = useRouter()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setMyPosition([coords.latitude, coords.longitude])
        }, () => {
            setAlert(true)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Lokasi</title>
            </Head>
            <main>
                {myPosition && <div className={styles.map}>
                    <FindMap
                        roomPosition={[router.query.latitude, router.query.longitude]}
                        myPosition={myPosition}
                    />
                </div>}
            </main>
            {alert && <Alert
                text="Silahkan aktifkan lokasi perangkat!"
                onClose={() => setAlert(false)}
            />}
        </>
    )
}