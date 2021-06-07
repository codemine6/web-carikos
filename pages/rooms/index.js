import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useFormContext} from 'contexts/RoomFormContext'
import {getData} from 'libs/Api'
import {withOwnerAuth} from 'libs/Route'
import styles from 'styles/rooms.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import RoomItem from 'components/RoomItem/RoomItem'

export default function Rooms({rooms}) {
    const form = useFormContext()
    const [results, setResults] = useState(rooms)
    const router = useRouter()

    function onSearch(e) {
        const data = rooms.filter(room => room.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setResults(data)
    }

    useEffect(() => {
        form.dispatch({type: 'SET_DEFAULT'})
    }, [form])

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
        </>
    )
}

export const getServerSideProps = withOwnerAuth(async context => {
    try {
        const res = await getData('/rooms', context)
        return {props: {rooms: res.data.data}}
    } catch {
        return {notFound: true}
    }
})