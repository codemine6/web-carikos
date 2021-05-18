import {useRouter} from 'next/router'
import styles from './Navbar.module.css'

import {ChevronLeft} from 'libs/Icons'

export default function Navbar() {
    const router = useRouter()

    return (
        <nav className={styles.navbar}>
            <i onClick={() => router.back()}><ChevronLeft/></i>
        </nav>
    )
}