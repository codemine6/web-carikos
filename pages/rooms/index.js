import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useFormContext} from 'contexts/RoomFormContext'
import useFetch from 'libs/useFetch'
import {withOwnerAuth} from 'libs/Route'
import styles from 'styles/rooms.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import RoomItem from 'components/RoomItem/RoomItem'

export default function Rooms() {
    const form = useFormContext()
    const {data: rooms, isLoading} = useFetch('/rooms')
    const [results, setResults] = useState([])
    const router = useRouter()

    function onSearch(e) {
        const data = rooms.filter(room => room.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setResults(data)
    }

    useEffect(() => {
        setResults(rooms ?? [])
        form.dispatch({type: 'SET_DEFAULT'})
    }, [form, rooms])

    return (
        <>
            <Head>
                <title>My Rooms</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <Button onClick={() => router.push('rooms/add')}>Tambah</Button>
                    <div className={styles.search}>
                        <input placeholder="Search.." spellCheck={false} onChange={onSearch}/>
                    </div>
                    <div>
                        {results.map(room => (
                            <RoomItem key={room._id} room={room}/>
                        ))}
                    </div>
                    {rooms?.length === 0 && <p className={styles.empty}>Belum ada kamar</p>}
                </div>
            </main>
            {isLoading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withOwnerAuth(() => ({props: {}}))