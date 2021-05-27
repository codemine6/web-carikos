import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import styles from './Sidebar.module.css'

import {Booking, Chat, ChevronRight, Dashboard, Login, Logout, Register, Settings, Star} from 'libs/Icons'
import Link from 'next/link'

export default function Sidebar(props) {
    const {auth, dispatch} = useAuthContext()
    const router = useRouter()

    async function logout() {
        try {
            props.onClose()
            dispatch(null)
            API.get('/auth/logout')
        } catch {}
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.removeAttribute('style')
    }, [])

    return (
        <>
            <div className={styles.overlay} onClick={() => props.onClose()}/>
            <div className={styles.sidebar}>
                {auth &&
                <div className={styles.profile}>
                    <img src={auth.profileImage} alt="" onClick={() => router.push('/profile')}/>
                    <h3>{auth.username}</h3>
                </div>}

                {auth?.type === 'owner' &&
                <div className={styles.menu}>
                    <Link href="/users/dashboard"><a><Dashboard/>Dashboard</a></Link>
                    <Link href="/chats"><a><Chat/>Diskusi</a></Link>
                    <Link href="/reviews?type=new"><a><Star/>Reviews</a></Link>
                    <Link href="/settings"><a><Settings/>Settings</a></Link>
                    <a onClick={logout}><Logout/>Keluar</a>
                </div>}

                {auth?.type === 'customer' &&
                <div className={styles.menu}>
                    <Link href="/chats"><a><Chat/>Diskusi</a></Link>
                    <Link href="/bookings?status=waiting"><a><Booking/>Pesanan</a></Link>
                    <Link href="/rooms/favorites"><a><Star/>Favorites</a></Link>
                    <Link href="/settings"><a><Settings/>Settings</a></Link>
                    <a onClick={logout}><Logout/>Keluar</a>
                </div>}

                {!auth &&
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