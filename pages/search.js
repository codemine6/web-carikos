import {useState} from 'react'
import {useRouter} from 'next/router'
import API from 'libs/Api'
import styles from 'styles/search.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Loader from 'components/Loader/Loader'
import SearchForm from 'components/SearchForm/SearchForm'
import RoomMenu from 'components/RoomMenu/RoomMenu'
import RoomCard from 'components/RoomCard/RoomCard'

export default function Search() {
    const [rooms, setRooms] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    function changeType(type) {
        console.log(type)
    }

    async function getSearch(query) {
        try {
            setRooms()
            setLoading(true)
            const res = await API.get(`/search?query=${query}`)
            setRooms(res.data.data)
        } catch {} finally {setLoading(false)}
    }

    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <main className={styles.container}>
                <Navbar/>
                <SearchForm autofocus onSearch={getSearch}/>
                <RoomMenu onChange={changeType}/>
                <h4>{rooms?.length > 0 && `Ditemukan ${rooms.length}`}</h4>
                <h4>{rooms?.length === 0 && 'Tidak ditemukan'}</h4>
                <button className={styles.nearest} onClick={() => router.push('/rooms/nearest')}>Kost Disekitarmu..</button>
                <div className={styles.list}>
                    {rooms?.map(room => (
                        <RoomCard key={room._id} room={room}/>
                    ))}
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}