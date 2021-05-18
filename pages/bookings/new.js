import {useState} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import {withCustomerAuth} from 'libs/Route'
import API from 'libs/Api'
import styles from 'styles/newBooking.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import RoomSummary from 'components/RoomSummary/RoomSummary'

export default function New({room}) {
    const {auth} = useAuthContext()
    const router = useRouter()
    const [time, setTime] = useState(1)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function goBooking() {
        setLoading(true)
        const code = `BO/${String(new Date().getDate()).padStart(2, '0')}${String(new Date().getMonth() + 1).padStart(2, '0')}${new Date().getFullYear()}/${room._id.substr(0,5)}/${auth._id.substr(0,5)}`
        const data = {
            customer: auth._id,
            details: {
                code,
                time,
                type: room.pricing.type
            },
            owner: room.owner,
            payment: {
                total: room.pricing.price * time,
                type: 'direct_pay'
            },
            room: room._id
        }

        try {
            setLoading(true)
            const res = await API.post('/bookings', data)
            router.push({pathname: '/bookings/finish', query: {booking: res.data.data._id}})
        } catch (err) {
            setLoading(false)
            setError(err.response?.data.message)
        }
    }

    return (
        <>
            <Head>
                <title>Pesanan baru</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <h3>Lanjutkan Pemesanan</h3>
                    <RoomSummary room={room}/>
                    <h4>Harga</h4>
                    <p className={styles.price}>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>

                    <div className={styles.detail}>
                        <button disabled={time === 1} onClick={() => setTime(time - 1)}>-</button>
                        <span>{time}</span>
                        <button disabled={time === 6} onClick={() => setTime(time + 1)}>+</button>
                        <p>Pesan untuk {time} {room.pricing.type}</p>
                    </div>

                    <h4>Total Bayar</h4>
                    <p className={styles.price}>Rp. {(room.pricing.price * time).toLocaleString('id-ID')}</p>
                    <h4>Metode Pembayaran</h4>
                    <div className={styles.payment}>
                        <div>
                            <i/>
                            <p>Bayar Langsung</p>
                        </div>
                    </div>
                </div>
                <div className={styles.action}>
                    {error && <p>{error}</p>}
                    <Button onClick={!loading && goBooking}>Lanjutkan Pemesanan</Button>
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withCustomerAuth(async context => {
    try {
        const res = await API.get(`/rooms/${context.query.room}/detail`)
        return {props: {room: res.data.data}}
    } catch {
        return {notFound: true}
    }
})