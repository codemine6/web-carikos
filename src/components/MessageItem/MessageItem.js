import {useAuthContext} from 'contexts/AuthContext'
import styles from './MessageItem.module.css'

import {Check, DoubleCheck} from 'libs/Icons'

export default function MessageItem({message}) {
    const {auth} = useAuthContext()

    return (
        <>
            {auth._id === message.sender ?
            <div className={styles.myMessage}>
                <p>{message.text}</p>
                <div>
                    {message.read === undefined && <i className={styles.send}><Check/></i>}
                    {message.read === false && <i><Check/></i>}
                    {message.read === true && <i><DoubleCheck/></i>}
                    <span>{new Date(message.sendedAt).toString().substr(15, 6)}</span>
                </div>
            </div> :
            <div className={styles.otherMessage}>
                <p>{message.text}</p>
                <span>{new Date(message.sendedAt).toString().substr(15, 6)}</span>
            </div>}
        </>
    )
}