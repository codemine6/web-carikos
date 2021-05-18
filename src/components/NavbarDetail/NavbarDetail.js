import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import styles from './NavbarDetail.module.css'

import {ChevronLeft, Heart, HeartFill, Share} from 'libs/Icons'

export default function NavbarDetail() {
    const {auth} = useAuthContext()
    const [favorited, setFavorited] = useState(false)
    const router = useRouter()

    async function addFavorite() {
        try {
            setFavorited(!favorited)
            await API.put('/rooms/favorite', {room: router.query.id})
        } catch {}
    }

    function goShare() {
        if (navigator.share) {
            navigator.share({
                title: '',
                url: router.pathname
            })
        } else {
            window.open(router.asPath, '_blank')
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await API.get(`/users/${auth._id}`)
                res.data.data.roomFavorites.find(id => id === router.query.id) && setFavorited(true)
            } catch {}
        }
        auth?.type === 'customer' && fetchData()
    }, [auth, router.query.id])

    return (
        <nav className={styles.navbar}>
            <i className={styles.iconBack} onClick={() => router.back()}><ChevronLeft/></i>
            <div className={styles.right}>
                {auth?.type === 'customer' && <i className={styles.iconLike} onClick={addFavorite}>{favorited ? <HeartFill/> : <Heart/>}</i>}
                <i className={styles.iconShare} onClick={goShare}><Share/></i>
            </div>
        </nav>
    )
}