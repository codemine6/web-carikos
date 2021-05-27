import {withAuth} from 'libs/Route'
import {getData} from 'libs/Api'
import styles from 'styles/notifications.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import NotificationItem from 'components/NotificationItem/NotificationItem'

export default function Notifications({notifications}) {
    const notRead = notifications?.filter(item => !item.read).length

    return (
        <>
            <Head>
                <title>Notifications</title>
            </Head>
            <main>
                <Navbar/>
                <h2 className={styles.title}>Notifikasi {notRead > 0 && `(${notRead})`}</h2>
                <div className={styles.list}>
                    {notifications.map((notification, i) => (
                        <NotificationItem notification={notification} key={i}/>
                    ))}
                </div>
                {notifications.length === 0 && <p className={styles.empty}>Tidak ada pemberitahuan</p>}
            </main>
        </>
    )
}

export const getServerSideProps = withAuth(async context => {
    try {
        const res = await getData('/notifications', context)
        return {props: {notifications: res.data.data}}
    } catch {
        return {notFound: true}
    }
})