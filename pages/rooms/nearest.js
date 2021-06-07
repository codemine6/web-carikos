import {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import API from 'libs/Api'
import styles from 'styles/nearestRooms.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Loader from 'components/Loader/Loader'

const NearestMap = dynamic(() => import('components/Map/NearestMap'), {ssr: false})

export default function Nearest() {
    const [rooms, setRooms] = useState()
    const [myPosition, setMyPosition] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await API.get(`/rooms/nearest?lat=${myPosition[0]}&long=${myPosition[1]}`)
                setRooms(res.data.data)
            } catch {} finally {setLoading(false)}
        }
        myPosition && fetchData()
    }, [myPosition])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setMyPosition([coords.latitude, coords.longitude])
        }, () => console.log('Please enable location for this page!'))
    }, [])

    return(
        <>
            <Head>
                <title>Kost Terdekat</title>
            </Head>
            <main>
                <Navbar/>
                {myPosition && <div className={styles.map}>
                    <NearestMap myPosition={myPosition} rooms={rooms}/>
                </div>}
            </main>
            {loading && <Loader/>}
        </>
    )
}