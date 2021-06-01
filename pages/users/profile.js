import {getData} from 'libs/Api'
import {withAuth} from 'libs/Route'
import Time from 'libs/Time'
import styles from 'styles/profile.module.css'

import Head from 'next/head'
import NavbarProfile from 'components/NavbarProfile/NavbarProfile'

export default function Profile(props) {
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <main>
                <NavbarProfile/>
                <div className={styles.main}>
                    <img src={props.profileImage} alt=""/>
                    <div>
                        <h3>{props.username}</h3>
                        <p>{props.email}</p>
                    </div>
                </div>
                <div className={styles.detail}>
                    <p>Status: <span>{props.userType === 'owner' ? 'Pemilik kost' : 'Penyewa kost'}</span></p>
                    <p>Telepon: <span>{props.phone}</span></p>
                    <p>Bergabung sejak {Time(props.registerTime).toDate()}</p>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = withAuth(async context => {
    try {
        const res = await getData('/users/profile', context)
        return {props: res.data.data}
    } catch {
        return {notFound: true}
    }
})