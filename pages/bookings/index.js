import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import {withAuth} from 'libs/Route'
import styles from 'styles/bookings.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import BookingItem from 'components/BookingItem/BookingItem'

export default function Bookings({bookings}) {
    const {auth} = useAuthContext()
    const router = useRouter()
    const status = router.query.status

    return (
        <>
            <Head>
                <title>Bookings</title>
            </Head>
            <main>
            <Navbar/>
                <div className={styles.menu}>
                    <button className={status === 'waiting' ? styles.selected : null} onClick={() => router.replace('/bookings?status=waiting')}>Menunggu Konfirmasi</button>
                    <button className={status === 'confirmed' ? styles.selected : null} onClick={() => router.replace('/bookings?status=confirmed')}>Menunggu Pembayaran</button>

                    {auth?.type === 'owner' && <>
                        <button className={status === 'finished' ? styles.selected : null} onClick={() => router.replace('/bookings?status=finished')}>Selesai</button>
                        <button className={status === 'canceled' ? styles.selected : null} onClick={() => router.replace('/bookings?status=canceled')}>Dibatalkan</button>
                    </>}

                    <button className={status === "all" ? styles.selected : null} onClick={() => router.replace('/bookings?status=all')}>Semua</button>
                </div>
                <div className={styles.list}>
                    {bookings.map((booking, i) => (
                        <BookingItem booking={booking} key={i}/>
                    ))}
                </div>
                {bookings?.length === 0 && <p className={styles.empty}>Tidak ada pesanan</p>}
            </main>
        </>
    )
}

export const getServerSideProps = withAuth(async context => {
    try {
        const cookie = context.req.headers.cookie
        const res = await API.get(`/bookings?status=${context.query.status}`, {headers: {cookie}})
        return {props: {bookings: res.data.data}}
    } catch {
        return {notFound: true}
    }
})