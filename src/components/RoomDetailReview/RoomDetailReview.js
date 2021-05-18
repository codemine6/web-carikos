import {useRouter} from 'next/router'
import styles from './RoomDetailReview.module.css'

import Rating from 'components/Rating/Rating'

export default function RoomDetailReview({review, count}) {
    const router = useRouter()

    return (
        <div className={styles.review}>
            <h4>Ulasan Penyewa</h4>
            <p className={styles.count}>{count} Ulasan</p>
            <Rating rate={review.rating}/>
            <p>Oleh <b>{review.customer.username}</b></p>
            <p>{review.message}</p>
            <button onClick={() => router.push(`/rooms/${router.query.id}/reviews`)}>Lihat Semua</button>
        </div>
    )
}