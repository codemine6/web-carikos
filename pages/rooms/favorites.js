import {getData} from 'libs/Api'
import {withCustomerAuth} from 'libs/Route'
import styles from 'styles/roomList.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import RoomCard from 'components/RoomCard/RoomCard'

export default function Favorites({rooms}) {
    return (
        <>
            <Head>
                <title>Favorites</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <h1>Kost favorite kamu</h1>
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

export const getServerSideProps = withCustomerAuth(async context => {
    try {
        const res = await getData('rooms/favorite', context)
        return {props: {rooms: res.data.data}}
    } catch {
        return {notFound: true}
    }
})