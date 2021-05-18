import {useRouter} from 'next/router'

import styles from './UserSummary.module.css'

export default function UserSummary({user}) {
    const router = useRouter()

    return (
        <div className={styles.user}>
            <img src={user.profileImage} alt=""/>
            <div>
                <h4 onClick={() => router.push(`/users/${user.id}`)}>{user.username}</h4>
                <p>{user.type === 'owner' ? 'Pemilik kost' : 'Penyewa kost'}</p>
            </div>
        </div>
    )
}