import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import styles from './RoomAction.module.css'

import {Chat} from 'libs/Icons'
import Button from 'components/Button/Button'

export default function RoomAction({room, startChat}) {
    const {auth} = useAuthContext()
    const router = useRouter()

    function goBooking() {
        router.push({pathname: '/bookings/new', query: {room: room._id}})
    }

    return (
        <div className={styles.action}>
            <div className={styles.price}>
                <p>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>
                {room.availableRooms === 0 && <span>Tidak tersedia</span>}
            </div>
            <div className={styles.option}>
                {room.owner._id !== auth?._id && <button className={styles.chat} onClick={startChat}><Chat/></button>}
                <Button disabled={!auth || auth.type === 'owner' || room.availableRooms === 0} onClick={goBooking}>Pesan Sekarang</Button>
            </div>
        </div>
    )
}