import styles from './RoomSkeleton.module.css'

import {Image} from 'libs/Icons'

export default function RoomSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.image}><Image/></div>
            <div className={styles.type}/>
            <div className={styles.name}/>
            <div className={styles.city}/>
            <div className={styles.price}/>
        </div>
    )
}