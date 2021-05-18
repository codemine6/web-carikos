import {useState} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import {withAuth} from 'libs/Route'
import styles from 'styles/settings.module.css'

import {ChevronRight, ChevronTop} from 'libs/Icons'
import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'

export default function Settings() {
    const {auth} = useAuthContext()
    const [account, setAccount] = useState(false)
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <div className={styles.user}>
                        <img src={auth.profileImage} alt=""/>
                        <div>
                            <h4>{auth.username}</h4>
                            <p>{auth.email}</p>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <p onClick={() => setAccount(!account)}>Akun {account ? <ChevronTop/> : <ChevronRight/>}</p>
                        {account && <div>
                            <p onClick={() => router.push('/set-password')}>Ubah Password</p>
                        </div>}

                        <p>Notifikasi</p>
                        <p>Dukungan</p>
                        <p>Bantuan</p>
                        <p>Privasi dan keamanan</p>
                        <p>Tentang</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = withAuth(() => ({props: {}}))