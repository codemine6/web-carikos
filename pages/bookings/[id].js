import {useState} from 'react'
import {useAuthContext} from 'contexts/AuthContext'
import Time from 'libs/Time'
import API from 'libs/Api'
import {withAuth} from 'libs/Route'
import styles from 'styles/bookingDetail.module.css'

import {Copy} from 'libs/Icons'
import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Toast from 'components/Toast/Toast'
import RoomSummary from 'components/RoomSummary/RoomSummary'
import UserSummary from 'components/UserSummary/UserSummary'
import BookingStep from 'components/BookingStep/BookingStep'
import BookingAction from 'components/BookingAction/BookingAction'

export default function BookingDetail(props) {
    const [booking, setBooking] = useState(props.booking)
    const {auth} = useAuthContext()

    function copyCode() {
        navigator.clipboard.writeText(booking.bookingCode)
    }

    return (
        <>
            <Head>
                <title>Detail Pesanan</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <h1>Detail Pesanan</h1>
                    <RoomSummary room={booking.room}/>
                    <div className={styles.detail}>
                        <span>Status:</span>
                        {booking.status === 'waiting' && <p>Menunggu Konfirmasi</p>}
                        {booking.status === 'confirmed' && <p>Menunggu Pembayaran</p>}
                        {booking.status === 'finished' && <p>Selesai</p>}
                        {booking.status === 'canceled' && <p>Dibatalkan</p>}

                        {booking.status === 'waiting' && <>
                            <span className={styles.title}>Sisa Waktu</span>
                            <p>{Time(booking.bookedAt).remaining(259200)}</p>
                        </>}
                        <span>Waktu Sewa</span>
                        <p>{booking.details.time} {booking.details.type}</p>
                        <span>Total Pembayaran:</span>
                        <p className={styles.price}>Rp. {booking.payment.total.toLocaleString('id-ID')}</p>
                        <span>Kode Pesanan:</span>
                        <div className={styles.code}>
                            <p>{booking.details.code}</p>
                            <Toast message="Kode berhasil disalin!">
                                <i onClick={copyCode}><Copy/></i>
                            </Toast>
                        </div>
                    </div>

                    <h4>Riwayat</h4>
                    <BookingStep booking={booking}/>

                    {auth?.type === 'owner' ? <>
                        <h4>Pemesan</h4>
                        <UserSummary user={booking.customer}/>
                    </> : <>
                        <h4>Pemilik</h4>
                        <UserSummary user={booking.owner}/>
                    </>}
                    {auth && <BookingAction booking={booking} setBooking={setBooking} />}
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = withAuth(async context => {
    try {
        const cookie = context.req.headers.cookie
        const res = await API.get(`/bookings/${context.query.id}`, {headers: {cookie}})
        return {props: {booking: res.data.data}}
    } catch {
        return {notFound: true}
    }
})