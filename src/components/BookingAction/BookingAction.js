import {useState} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import styles from './BookingAction.module.css'

import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function BookingAction({booking, setBooking}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const {auth} = useAuthContext()
    const router = useRouter()

    async function updateBooking(type) {
        setLoading(true)
        try {
            const res = await API.patch(`/bookings/${booking._id}/${type}`)
            setBooking({...booking, ...res.data.data})
        } catch (err) {
            setError(err.response?.data.message)
        } finally {setLoading(false)}
    }

    async function startChat() {
        setLoading(true)
        try {
            const user = auth.type === 'owner' ? booking.customer._id : booking.owner._id
            const res = await API.post('/chats/start', {user})
            router.push(`/chats/${res.data.data._id}`)
        } catch (err) {
            setLoading(false)
            setError(err.message)
        }
    }

    return (
        <>
            <p className={styles.error}>{error}</p>
            <div className={styles.action}>
                {auth.type === 'owner' && booking.status === 'waiting' && booking.room.availableRooms > 0 &&
                    <Button onClick={() => !loading && updateBooking('confirm')}>Konfirmsi Pesanan</Button>
                }
                {auth.type === 'owner' && booking.status === 'confirmed' &&
                    <Button onClick={() => !loading && updateBooking('finish')}>Selesai</Button>
                }
                {(booking.status === 'waiting' || (booking.status === 'confirmed' && auth.type === 'owner')) &&
                    <Button id={styles.cancel} onClick={() => !loading && updateBooking('cancel')}>Batalkan Pesanan</Button>
                }
                {auth.type === 'customer' && booking.status === 'finished' &&
                    <Button onClick={() => router.push({pathname: `/reviews/add`, query: {booking: booking._id}})}>Berikan Ulasan</Button>
                }
                <Button id={styles.chat} onClick={startChat}>Hubungi {auth.type === 'owner' ? 'Pemesan' : 'Pemilik'}</Button>
            </div>
            {loading && <Loader/>}
        </>
    )
}