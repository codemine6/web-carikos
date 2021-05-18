import {useState} from 'react'
import API from 'libs/Api'
import Time from 'libs/Time'
import styles from './ReviewAction.module.css'

import {Location} from 'libs/Icons'
import Rating from 'components/Rating/Rating'
import Button from 'components/Button/Button'

export default function ReviewItem({review}) {
    const [input, setInput] = useState(review.reply?.message ?? '')
    const [open, setOpen] = useState(false)

    function addReply() {
        if (input) {
            try {
                API.patch(`/reviews/${review._id}/reply`, {message: input})
                setOpen(false)
            } catch {}
        }
    }

    return (
        <div className={styles.review}>
            <div className={styles.room}>
                <img src={review.room.images[0]} alt=""/>
                <div>
                    <h4>{review.room.name}</h4>
                    <div className={styles.location}>
                        <Location/>
                        <p>{review.room.location.city}</p>
                    </div>
                </div>
            </div>
            <Rating rate={review.rating}/>
            <p className={styles.from}>Oleh <b>{review.customer.username}</b></p>
            <p className={styles.time}>{Time(review.createdAt).fromNow()}</p>
            <p className={styles.message}>{review.message}</p>
            <button id={styles.replyBtn} onClick={() => setOpen(!open)}>{open ? 'Tutup' : 'Balas'}</button>

            {open && <div className={styles.form}>
                <textarea placeholder="Balasanmu.." value={input} onChange={e => setInput(e.target.value)}/>
                <Button onClick={addReply}>Kirim</Button>
            </div>}
        </div>
    )
}