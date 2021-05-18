import {useRouter} from 'next/router'
import styles from './RoomMenu.module.css'

import Confirm from 'components/Confirm/Confirm'

export default function RoomMenu(props) {
    const router = useRouter()

    function deleteRoom() {}

    return (
        <div className={styles.menu} ref={props.menuRef}>
            <p onClick={() => router.push(`/rooms/${props.id}`)}>Lihat Detail</p>
            <p onClick={() => router.push(`/rooms/edit?id=${props.id}`)}>Edit</p>
            <Confirm title="Apakah kamu yakin akan menghapusnya?" onConfirm={deleteRoom}>
                <p>Hapus</p>
            </Confirm>
        </div>
    )
}