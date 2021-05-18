import {useState} from 'react'
import {useRouter} from 'next/router'
import API from 'libs/Api'
import config from 'libs/config'
import styles from 'styles/verification.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function ForgotPassword() {
    const [email, setEmail] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const status = router.query.status

    async function sendEmail() {
        setLoading(true)
        try {
            await API.post('/forgot-password', {email})
            router.replace('/forgot-password?status=sended')
        } catch {} finally {setLoading(false)}
    }

    return (
        <>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <main>
                <Navbar/>
                {status === 'sended' ?
                <div className={styles.container}>
                    <h3>Tautan dikirim</h3>
                    <p className={styles.desc}>Tautan untuk mengatur ulang password telah dikirim ke email kamu. Silahkan atur ulang password melalui tautan tersebut.</p>
                </div> :
                <div className={styles.container}>
                    <h3>Lupa Password</h3>
                    <p className={styles.desc}>Silahkan kamu masukan alamat email yang digunakan oleh akun terkait supaya kami bisa mengirim tautan untuk mereset password Anda.</p>
                    <Input type="email" placeholder="Email" validation={config.emailPattern} onChange={setEmail}/>
                    <Button onClick={!loading && sendEmail}>Kirim</Button>
                </div>}
            </main>
            {loading && <Loader/>}
        </>
    )
}