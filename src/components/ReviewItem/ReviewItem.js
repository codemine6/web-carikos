import {useState} from 'react'
import styles from './ReviewItem.module.css'

import Time from 'libs/Time'
import {ChevronBottom, ChevronTop} from 'libs/Icons'
import Rating from 'components/Rating/Rating'

export default function ReviewItem({review}) {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.review}>
            <Rating rate={review.rating}/>
            <p className={styles.from}>Oleh <b>{review.customer.username}</b></p>
            <p className={styles.time}>{Time(review.createdAt).fromNow()}</p>
            <p className={styles.message}>{review.message}</p>
            {review.reply &&
                <button className={styles.replyBtn} onClick={() => setOpen(!open)}>Balasan {open ? <ChevronTop/> : <ChevronBottom/>}</button>
            }

            {open && <div className={styles.reply}>
                <p>{review.reply.message}</p>
                <span>{Time(review.reply.createdAt).fromNow()}</span>
            </div>}
        </div>
    )
}