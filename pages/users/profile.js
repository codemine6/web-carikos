import {useAuthContext} from 'contexts/AuthContext'
import {withAuth} from 'libs/Route'
import Time from 'libs/Time'
import styles from 'styles/profile.module.css'

import Head from 'next/head'
import NavbarProfile from 'components/NavbarProfile/NavbarProfile'

export default function Profile() {
    const {auth} = useAuthContext()

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <main>
                <NavbarProfile/>
                <div className={styles.main}>
                    <img src={auth.profileImage} alt=""/>
                    <div>
                        <h3>{auth.username}</h3>
                        <p>{auth.email}</p>
                    </div>
                </div>
                <div className={styles.detail}>
                    <p>Status: <span>{auth.userType === 'owner' ? 'Pemilik kost' : 'Penyewa kost'}</span></p>
                    <p>Telepon: <span>{auth.phone}</span></p>
                    <p>Bergabung sejak {Time(auth.registerTime).toDate()}</p>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = withAuth(() => ({props: {}}))