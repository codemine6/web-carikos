import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {io} from 'socket.io-client'
import nookies from 'nookies'
import {useAuthContext} from 'contexts/AuthContext'
import config from 'libs/config'
import styles from './NavbarHome.module.css'

import {Bell, ChatFill, Close, Menu} from 'libs/Icons'
import Sidebar from 'components/Sidebar/Sidebar'

export default function NavbarHome() {
    const {auth} = useAuthContext()
    const [user, setUser] = useState()
    const [chats, setChats] = useState()
    const [notifications, setNotifications] = useState()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (auth) {
            const socketChat = io(`${config.apiUrl}/chat`)
            socketChat.emit('count', auth._id, setChats)
            socketChat.on('new_count', setChats)

            const socketNotif = io(`${config.apiUrl}/notification`)
            socketNotif.emit('count', auth._id, setNotifications)
            socketNotif.on('new_count', setNotifications)

            return () => {
                socketChat.close()
                socketNotif.close()
            }
        } else {
            const {access} = nookies.get()
            const token = access?.split('.')[1]
            const data = token && JSON.parse(Buffer.from(token, 'base64').toString())
            setUser(data)
        }
    }, [auth])

    return (
        <>
            <nav className={styles.navbar}>
                {(auth || user) && <div className={styles.user}>
                    <img src={auth?.profileImage ?? user?.profileImage} alt="" onClick={() => router.push('/users/profile')}/>
                    <p>Hi {auth?.username.split(' ')[0] ?? user?.username.split(' ')[0]}</p>
                </div>}
                <div className={styles.menu}>
                    {(auth || user) && <>
                        <i onClick={() => router.push('/chats')}><ChatFill/>{chats > 0 && <span>{chats}</span>}</i>
                        <i onClick={() => router.push('/users/notifications')}><Bell/>{notifications > 0 && <span>{notifications}</span>}</i>
                    </>}
                    <i onClick={() => setOpen(!open)}>{open ? <Close/> : <Menu/>}</i>
                </div>
            </nav>
            {open && <Sidebar onClose={() => setOpen(false)}/>}
        </>
    )
}