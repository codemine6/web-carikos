import {useState, useRef, useEffect} from 'react'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import {getData} from 'libs/Api'
import {withAuth} from 'libs/Route'
import config from 'libs/config'
import styles from 'styles/chats.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import ChatItem from 'components/ChatItem/ChatItem'

export default function Chats(props) {
    const {auth} = useAuthContext()
    const [chats, setChats] = useState(props.chats)
    const chatsRef = useRef()

    useEffect(() => {
        if (!auth) return
        chatsRef.current = chats

        const socket = io(`${config.apiUrl}/chat`)
        socket.emit('all', auth?._id)
        socket.on('new_chat', data => {
            if (chatsRef.current.some(chat => chat._id === data._id)) {
                const list = chatsRef.current.map(chat => chat._id === data._id ? {...chat, ...data} : chat)
                list.sort((a, b) => new Date(b.message.sendedAt) - new Date(a.message.sendedAt))
                setChats(list)
                chatsRef.current = list
            } else {
                const list = [...chatsRef.current, data].reverse()
                setChats(list)
                chatsRef.current = list
            }
        })

        return () => socket.close()
    }, [auth])

    return (
        <>
            <Head>
                <title>Chats</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.list}>
                    {auth && chats?.map(chat => (
                        <ChatItem chat={chat} key={chat._id}/>
                    ))}
                </div>
                {chats.length === 0 && <p className={styles.empty}>Belum ada percakapan</p>}
            </main>
        </>
    )
}

export const getServerSideProps = withAuth(async context => {
    try {
        const res = await getData('/chats', context)
        return {props: {chats: res.data.data}}
    } catch {
        return {notFound: true}
    }
})