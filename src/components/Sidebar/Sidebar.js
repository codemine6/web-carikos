import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import nookies from 'nookies'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import styles from './Sidebar.module.css'

import {Booking, ChatFill, ChevronRight, Dashboard, Login, Logout, Register, Settings, Star} from 'libs/Icons'
import Link from 'next/link'

export default function Sidebar(props) {
    const {auth, dispatch} = useAuthContext()
    const [user, setUser] = useState()
    const router = useRouter()

    async function logout() {
        try {
            props.onClose()
            dispatch(null)
            API.get('/auth/logout')
        } catch {}
    }

    useEffect(() => {
        const {access} = nookies.get()
        const token = access?.split('.')[1]
        const data = token && JSON.parse(Buffer.from(token, 'base64').toString())
        setUser(data)

        document.body.style.overflow = 'hidden'
        return () => document.body.removeAttribute('style')
    }, [])

    return (
        <>
            <div className={styles.overlay} onClick={() => props.onClose()}/>
            <div className={styles.sidebar}>
                {(auth || user) &&
                <div className={styles.profile}>
                    <img src={auth?.profileImage ?? user?.profileImage} alt="" onClick={() => router.push('/profile')}/>
                    <h3>{auth?.username ?? user?.username}</h3>
                </div>}

                {(auth?.type || user?.type) === 'owner' &&
                <div className={styles.menu}>
                    <Link href="/dashboard"><a><Dashboard/>Dashboard</a></Link>
                    <Link href="/chats"><a><ChatFill/>Diskusi</a></Link>
                    <Link href="/reviews?type=new"><a><Star/>Reviews</a></Link>
                    <Link href="/settings"><a><Settings/>Settings</a></Link>
                    <a onClick={logout}><Logout/>Keluar</a>
                </div>}

                {(auth?.type || user?.type) === 'customer' &&
                <div className={styles.menu}>
                    <Link href="/chats"><a><ChatFill/>Diskusi</a></Link>
                    <Link href="/bookings?status=waiting"><a><Booking/>Pesanan</a></Link>
                    <Link href="/rooms/favorites"><a><Star/>Favorites</a></Link>
                    <Link href="/settings"><a><Settings/>Settings</a></Link>
                    <a onClick={logout}><Logout/>Keluar</a>
                </div>}

                {(!auth && !user) &&
                <div className={styles.menu}>
                    <Link href="/login"><a><Login/>Masuk</a></Link>
                    <Link href="/register"><a><Register/>Daftar</a></Link>
                </div>}
                <div className={styles.other}>
                    <li>Artikel<ChevronRight/></li>
                    <li>Bantuan<ChevronRight/></li>
                    <li>Syarat & Ketentuan<ChevronRight/></li>
                </div>
            </div>
        </>
    )
}