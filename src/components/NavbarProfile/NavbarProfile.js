import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import styles from './NavbarProfile.module.css'

import {ChevronLeft, More} from 'libs/Icons'

export default function NavbarProfile() {
    const [menu, setMenu] = useState(false)
    const toggleRef = useRef()
    const router = useRouter()

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
                <i ref={toggleRef} onClick={() => setMenu(!menu)}><More/></i>
            </nav>
            {menu && <div className={styles.menu}>
                <p onClick={() => router.push('/users/edit')}>Edit Profile</p>
            </div>}
        </>
    )
}