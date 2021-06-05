import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import {withOwnerAuth} from 'libs/Route'
import config from 'libs/config'
import styles from 'styles/dashboard.module.css'

import {Booking, Chat, ChevronRight, Home, Star} from 'libs/Icons'
import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Loader from 'components/Loader/Loader'

export default function Dashboard() {
    const {auth} = useAuthContext()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!auth) return
        const socket = io(`${config.apiUrl}/dashboard`)
        socket.emit('get', auth?._id, res => {
            setData(res)
            setLoading(false)
        })

        return () => socket.close()
    }, [auth])

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <main>
                <Navbar title="Dashboard"/>
                {auth && <div className={styles.profile}>
                    <img src={auth.profileImage} alt="" onClick={() => router.push('/profile')}/>
                    <div>
                        <h4>{auth.username}</h4>
                        <p>{auth.email}</p>
                    </div>
                </div>}
                <div className={styles.info}>
                    <div onClick={() => router.push('/rooms')}>
                        <Home/>
                        <p>{data?.rooms} Kamar</p>
                    </div>
                    <div onClick={() => router.push('/bookings?status=waiting')}>
                        <Booking/>
                        <p>{data?.bookings} Pesanan</p>
                    </div>
                    <div onClick={() => router.push('/reviews?type=new')}>
                        <Star/>
                        <p>{data?.reviews} Ulasan</p>
                    </div>
                </div>
                <h3 className={styles.title}>Lainnya</h3>
                <div className={styles.list}>
                    <div className={styles.item} onClick={() => router.push('/chats')}>
                        <i className={styles.icon}><Chat/></i>
                        <div>
                            <h4>Diskusi</h4>
                            <p>{data?.messages} Pesan baru</p>
                        </div>
                        <i className={styles.more}><ChevronRight/></i>
                    </div>
                    <div className={styles.item} onClick={() => router.push('/bookings')}>
                        <i className={styles.icon}><Booking/></i>
                        <div>
                            <h4>Pesanan</h4>
                            <p>{data?.bookings} menunggu konfirmasi</p>
                        </div>
                        <i className={styles.more}><ChevronRight/></i>
                    </div>
                    <div className={styles.item} onClick={() => router.push('/reviews')}>
                        <i className={styles.icon}><Star/></i>
                        <div>
                            <h4>Ulasan</h4>
                            <p>{data?.reviews} ulasan baru</p>
                        </div>
                        <i className={styles.more}><ChevronRight/></i>
                    </div>
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withOwnerAuth(() => ({props: {}}))