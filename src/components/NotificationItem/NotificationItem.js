import {useRouter} from 'next/router'
import API from 'libs/Api'
import Time from 'libs/Time'
import styles from './NotificationItem.module.css'

export default function NotificationItem({notification}) {
    const router = useRouter()

    function goDetail() {
        API.patch(`/notifications/${notification._id}`)
        router.push(notification.link)
    }

    return (
        <div className={notification.read ? styles.item : `${styles.notRead} ${styles.item}`} onClick={goDetail}>
            <h4>{notification.title}</h4>
            <p>{notification.text}</p>
            <span>{Time(notification.createdAt).fromNow()}</span>
        </div>
    )
}