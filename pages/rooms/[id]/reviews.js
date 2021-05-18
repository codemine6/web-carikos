import API from 'libs/Api'
import styles from 'styles/roomList.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import ReviewItem from 'components/ReviewItem/ReviewItem'

export default function Reviews({reviews}) {
    return (
        <>
            <Head>
                <title>Semua Ulasan</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <h1>Semua Ulasan</h1>
                    <div>
                        {reviews?.map((review, i) => (
                            <ReviewItem review={review} key={i}/>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const res = await API.get(`/reviews/${context.query.id}/room`)
        return {props: {reviews: res.data.data}}
    } catch {
        return {notFound: true}
    }
}