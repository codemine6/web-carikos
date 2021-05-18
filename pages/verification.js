import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import styles from 'styles/verification.module.css'

import Head from 'next/head'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function Verification() {
    const {dispatch} = useAuthContext()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const id = router.query.id
    const token = router.query.token
    const status = router.query.status

    useEffect(() => {
        async function verifyEmail() {
            setLoading(true)
            try {
                const res = await API.post('/verify-email', {id, token})
                dispatch(res.data.data)
                router.replace('/verification?status=verified')
            } catch {
                router.replace('/verification?status=error')
                setError(err.response?.data.message)
            } finally {setLoading(false)}
        }

        (id && token) && verifyEmail()
    }, [dispatch, router, id, token])

    return (
        <>
            <Head>
                <title>Verification</title>
            </Head>
            <main>
                <div className={styles.container}>
                    {status === 'sended' && <>
                        <h3>Tautan dikirim</h3>
                        <p className={styles.desc}>Tautan untuk melakukan verifikasi telak dikirim ke email kamu. Silahkan lakukan verifikasi melalui email tautaun tersebut.</p>
                    </>}
                    {status === 'verified' && <>
                        <h3>Berhasil diverifikasi</h3>
                        <p className={styles.desc}>Selamat, akun kamu berhasil diverifikasi. Klik lanjutkan untuk memulai menggunakan aplikasi ini.</p>
                        <Button onClick={() => router.replace('/')}>Lanjutkan</Button>
                    </>}
                    {status === 'error' && <>
                        <h3>Verifikasi gagal</h3>
                        {error && <p className={styles.error}>{error}</p>}
                    </>}
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}