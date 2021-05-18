import {useState} from 'react'
import {useRouter} from 'next/router'
import API from 'libs/Api'
import {withOwnerAuth} from 'libs/Route'
import styles from 'styles/reviewList.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Loader from 'components/Loader/Loader'
import ReviewAction from 'components/ReviewAction/ReviewAction'

export default function Reviews({reviews}) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const type = router.query.type

    return (
        <>
            <Head>
                <title>Semua Ulasan</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <div className={styles.menu}>
                        <button className={type === 'new' ? styles.selected : null} onClick={() => router.replace('/reviews?type=new')}>Baru</button>
                        <button className={type === 'replied' ? styles.selected : null} onClick={() => router.replace('/reviews?type=replied')}>Dibalas</button>
                    </div>
                    <div>
                        {reviews.map(review => (
                            <ReviewAction key={review._id} review={review}/>)
                        )}
                    </div>
                </div>
                {reviews?.length === 0 && <p className={styles.empty}>Tidak ada ulasan</p>}
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withOwnerAuth(async context => {
    try {
        const cookie = context.req.headers.cookie
        const res = await API.get(`/reviews?type=${context.query.type}`, {headers: {cookie}})
        return {props: {reviews: res.data.data}}
    } catch {
        return {notFound: true}
    }
})