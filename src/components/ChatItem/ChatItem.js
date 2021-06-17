import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import styles from './ChatItem.module.css'

export default function ChatItem({chat}) {
    const {auth} = useAuthContext()
    const router = useRouter()

    return (
        <div className={styles.item} onClick={() => router.push(`/chats/${chat._id}`)}>
            <img src={chat.user.profileImage} alt=""/>
            <div>
                <h4>{chat.user.username}</h4>
                <span className={styles.time}>{new Date(chat.lastMessage.sendedAt).toString().substr(16, 5)}</span>
                {chat.lastMessage.sender !== auth?._id && chat.lastMessage.read === false ?
                <b>{chat.lastMessage.text}</b> : <p>{chat.lastMessage.text}</p>}
                {chat.newMessage > 1 && <span className={styles.new}>{chat.newMessage}</span>}
            </div>
        </div>
    )
}