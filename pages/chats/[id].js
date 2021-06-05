import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import {io} from 'socket.io-client'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import Time from 'libs/Time'
import {withAuth} from 'libs/Route'
import config from 'libs/config'
import styles from 'styles/chatDetail.module.css'

import Head from 'next/head'
import NavbarChat from 'components/NavbarChat/NavbarChat'
import Loader from 'components/Loader/Loader'
import MessageForm from 'components/MessageForm/MessageForm'
import MessageItem from 'components/MessageItem/MessageItem'

export default function Chat() {
    const {auth} = useAuthContext()
    const [user, setUser] = useState()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const messagesRef = useRef(messages)
    const listRef = useRef()
    const router = useRouter()
    let date

    async function newMessage(data) {
        const message = {...data, chat: router.query.id, receiver: user._id, sender: auth._id}
        setMessages([...messagesRef.current, message])
        try {
            const res = await API.post('/messages', message)
            const last = [...messagesRef.current].reverse().find(message => message.sender === auth._id)
            setMessages(messagesRef.current.map(message => message === last ? res.data.data : message))
        } catch {}
    }

    useEffect(() => {
        messagesRef.current = messages
        listRef.current.scrollTop = listRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (!auth) return
        const socket = io(`${config.apiUrl}/message`)
        socket.emit('messages', {chat: router.query.id, user: auth?._id}, res => {
            setUser(res.user)
            setMessages(res.messages)
            setLoading(false)
        })
        socket.on('new_message', message => {
            socket.emit('read', message._id)
            setMessages([...messagesRef.current, message])
        })
        socket.on('readed', id => {
            const readed = messagesRef.current.map(message => message._id === id ? {...message, read: true} : message)
            setMessages(readed)
        })

        return () => socket.close()
    }, [router.query.id, auth])

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <main>
                <NavbarChat user={user} reset={() => setMessages([])}/>
                <div className={styles.list} ref={listRef}>
                    {messages?.map((message, i) => {
                        if (message.sendedAt && date !== new Date(message.sendedAt).toString().substr(8,2)) {
                            date = new Date(message.sendedAt).toString().substr(8,2)
                            return (
                                <div key={i}>
                                    <p className={styles.date}>{Time(message.sendedAt).toDate()}</p>
                                    <MessageItem message={message}/>
                                </div>
                            )
                        }
                        return <MessageItem message={message} key={i}/>
                    })}
                </div>
                <MessageForm newMessage={newMessage} loading={loading}/>
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withAuth(() => ({props: {}}))