import {useRouter} from 'next/router'
import styles from './RoomDetailMain.module.css'

import {Map} from 'libs/Icons'
import Rating from 'components/Rating/Rating'

export default function RoomDetailMain({room}) {
    const router = useRouter()

    function findLocation() {
        const data = {
            location: {coords: room.location.coords},
            images: room.images[0],
            name: room.name,
            pricing: {price: room.pricing.price}
        }
        router.push({pathname: `/rooms/${room._id}/location`, query: JSON.stringify(data)})
    }

    return (
        <div>
            <h3 className={styles.name}>{room.name}</h3>
            <div className={styles.rating}>
                <Rating rate={room.rating}/>
                <p>{room.reviewCount} reviews</p>
                <div>
                    {room.customerType === 'all' && <b className={styles.all}>Kost Campur</b>}
                    {room.customerType === 'male' && <b className={styles.male}>Kost Putra</b>}
                    {room.customerType === 'female' && <b className={styles.female}>Kost Putri</b>}
                </div>
            </div>
            <div className={styles.location}>
                <div>
                    <h4>{room.location.city}</h4>
                    <p>{room.location.address}</p>
                </div>
                <button className={styles.mapIcon} aria-label="location" onClick={findLocation}><Map/></button>
            </div>

            <div className={styles.detail}>
                <p>{room.availableRooms ? room.availableRooms + ' Kamar tersedia' : 'Tidak tersedia'}</p>
                <p>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>
            </div>
        </div>
    )
}