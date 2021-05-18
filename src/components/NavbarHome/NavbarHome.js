import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import config from 'libs/config'
import styles from './NavbarHome.module.css'

import {Bell, Chat, Close, Menu} from 'libs/Icons'
import Sidebar from 'components/Sidebar/Sidebar'

export default function NavbarHome() {
    const {auth} = useAuthContext()
    const [chats, setChats] = useState([])
    const [notifications, setNotifications] = useState(0)
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
        }
    }, [auth])

    return (
        <>
            <nav className={styles.navbar}>
                {auth && <div className={styles.user}>
                    <img src={auth.profileImage} alt="" onClick={() => router.push('/users/profile')}/>
                    <p>Hi {auth.username.split(' ')[0]}</p>
                </div>}
                <div className={styles.menu}>
                    {auth && <>
                        <i onClick={() => router.push('/chats')}><Chat/>{chats > 0 && <span>{chats}</span>}</i>
                        <i onClick={() => router.push('/users/notifications')}><Bell/>{notifications > 0 && <span>{notifications}</span>}</i>
                    </>}
                    <i onClick={() => setOpen(!open)}>{open ? <Close/> : <Menu/>}</i>
                </div>
            </nav>
            {open && <Sidebar onClose={() => setOpen(false)}/>}
        </>
    )
}