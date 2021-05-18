import API from 'libs/Api'
import styles from 'styles/roomList.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import RoomCard from 'components/RoomCard/RoomCard'

export default function Popular({rooms}) {
    return (
        <>
            <Head>
                <title>Kost Popular</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <h1>Kost popular</h1>
                    <div className={styles.list}>
                        {rooms?.map((room, i) => (
                            <RoomCard room={room} key={i}/>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const res = await API.get('rooms/popular')
        return {props: {rooms: res.data.data}}
    } catch {
        return {notFound: true}
    }
}