import {useRouter} from 'next/router'
import styles from './RoomCard.module.css'

import {Location} from 'libs/Icons'

export default function RoomCard({room}) {
    const router = useRouter()

    return (
        <div className={styles.card} onClick={() => router.push(`/rooms/${room._id}`)}>
            <img src={room.images[0]} alt=""/>
            <div className={styles.detail}>
                {room.rating > 0 &&
                <div className={styles.rating}>
                    <span>★</span>
                    <p>{room.rating}</p>
                </div>}
                <div className={styles.type}>
                    {room.customerType === 'all' && <span className={styles.all}>Campur</span>}
                    {room.customerType === 'male' && <span className={styles.male}>Putra</span>}
                    {room.customerType === 'female' && <span className={styles.female}>Putri</span>}
                </div>
                <p className={styles.name}>{room.name}</p>
                <div className={styles.city}>
                    <Location/>
                    <div>
                        <span>{room.location.city}</span>
                        <p>{room.location.address}</p>
                    </div>
                </div>
                <p className={styles.price}>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>
            </div>
        </div>
    )
}