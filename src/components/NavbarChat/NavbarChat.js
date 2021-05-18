import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import API from 'libs/Api'
import styles from './NavbarChat.module.css'

import {ChevronLeft, More} from 'libs/Icons'

export default function NavChat({user, reset}) {
    const [menu, setMenu] = useState(false)
    const toggleRef = useRef()
    const router = useRouter()

    function deleteChat() {
        setMenu(false)
        reset()
        API.delete(`/chats/${router.query.id}/delete`)
    }


    function closeMenu(e) {
        !toggleRef.current?.contains(e.target) && setMenu(false)
    }

    useEffect(() => {
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [menu])

    return (
        <>
            <nav className={styles.navbar}>
                <i onClick={() => router.back()}><ChevronLeft/></i>
                {user && <div className={styles.user}>
                    <img src={user.profileImage} alt="" onClick={() => router.push(`/users/${user._id}`)}/>
                    <div>
                        <h4>{user.username}</h4>
                        <p>{user.userType === 'owner' ? 'Pemilik kost' : 'Penyewa kost'}</p>
                    </div>
                </div>}
                <i className={styles.more} ref={toggleRef} onClick={() => setMenu(!menu)}><More/></i>
            </nav>
            {menu && <div className={styles.menu}>
                <p onClick={deleteChat}>Hapus Percakapan</p>
            </div>}
        </>
    )
}