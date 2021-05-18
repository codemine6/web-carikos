import {useState, useRef, useEffect} from 'react'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import {withAuth} from 'libs/Route'
import config from 'libs/config'
import styles from 'styles/chats.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Loader from 'components/Loader/Loader'
import ChatItem from 'components/ChatItem/ChatItem'

export default function Chats() {
    const {auth} = useAuthContext()
    const [chats, setChats] = useState()
    const [loading, setLoading] = useState(true)
    const chatsRef = useRef()

    useEffect(() => {
        const socket = io(`${config.apiUrl}/chat`)
        socket.emit('all', auth?._id, res => {
            setChats(res)
            chatsRef.current = res
            setLoading(false)
        })
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
    }, [auth?._id])

    return (
        <>
            <Head>
                <title>Chats</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.list}>
                    {chats?.map(chat => (
                        <ChatItem chat={chat} key={chat._id}/>
                    ))}
                </div>
                {chats && chats.length === 0 && <p className={styles.empty}>Belum ada percakapan</p>}
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withAuth(() => ({props: {}}))