import API from 'libs/Api'
import {withOwnerAuth} from 'libs/Route'
import styles from 'styles/roomBookings.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import BookingItem from 'components/BookingItem/BookingItem'

export default function Bookings({bookings}) {
    return (
        <>
            <Head>
                <title>Semua Pesanan</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <h1>Semua Pesanan</h1>
                    <div>
                        {bookings?.map(booking => (
                            <BookingItem booking={booking} key={booking._id}/>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = withOwnerAuth(async context => {
    try {
        const cookie = context.req.headers.cookie
        const res = await API.get(`/bookings/${context.query.id}/room`, {headers: {cookie}})
        return {props: {bookings: res.data.data}}
    } catch {
        return {notFound: true}
    }
})