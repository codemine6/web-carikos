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
                <span>{new Date(chat.message.sendedAt).toString().substr(16, 5)}</span>
                {chat.message.sender !== auth._id && chat.message.read === false ?
                <b>{chat.message.text}</b> : <p>{chat.message.text}</p>}
            </div>
        </div>
    )
}