import {useState} from 'react'
import {useRouter} from 'next/router'
import {getData} from 'libs/Api'
import {withCustomerAuth} from 'libs/Route'
import styles from 'styles/addReview.module.css'

import {Star} from 'libs/Icons'
import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import RoomSummary from 'components/RoomSummary/RoomSummary'

export default function Add({review}) {
    const [rating, setRating] = useState(review.rating ?? 0)
    const [message, setMessage] = useState(review.message ?? '')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function sendReview() {
        setLoading(true)
        try {
            const data = {
                booking: router.query.booking,
                images: [],
                message,
                owner: review.room.owner,
                rating,
                room: review.room._id
            }
            await API.patch('/reviews/add', {...data})
        } catch {
        } finally {setLoading(false)}
    }

    return (
        <>
            <Head>
                <title>Tambahkan Ulasan</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <RoomSummary room={review.room}/>
                    <div className={styles.rating}>
                        {[1,2,3,4,5].map(i => (
                            <i className={i <= rating ? styles.marked : null} key={i} onClick={() => setRating(i)}><Star/></i>
                        ))}
                    </div>
                    <div className={styles.form}>
                        <label>Ceritakan pengalamanmu?</label>
                        <textarea placeholder="Ayo ceritakan pengalamanmu.." rows="4" value={message} onChange={e => setMessage(e.target.value)}/>
                        <Button onClick={!loading && sendReview}>{loading ? 'Menyimpan..' : 'Simpan'}</Button>
                    </div>
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withCustomerAuth(async context => {
    try {
        const cookie = context.req.headers.cookie
        const res = await getData(`/reviews/${context.query.booking}`, context)
        return {props: {review: res.data.data}}
    } catch {
        return {notFound: true}
    }
})