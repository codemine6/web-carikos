import {useState} from 'react'
import {useRouter} from 'next/router'
import API from 'libs/Api'
import config from 'libs/config'
import styles from 'styles/verification.module.css'

import Head from 'next/head'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const id = router.query.id
    const token = router.query.token
    const status = router.query.status

    async function changePassword() {
        setError()
        setLoading(true)
        try {
            await API.patch('/reset-password', {id, token, newPassword})
            router.replace('/reset-password?status=changed')
        } catch (err) {
            setError(err.response?.data.message)
        } finally {setLoading(false)}
    }

    return (
        <>
            <Head>
                <title>Reset Password</title>
            </Head>
            <main>
                {status === 'changed' ?
                <div className={styles.container}>
                    <h3>Password dirubah</h3>
                    <p className={styles.desc}>Password untuk akun Anda berhasil dirubah. Silahkan kamu login menggunakan password baru.</p>
                    <Button onClick={() => router.replace('/login')}>Login</Button>
                </div> :
                <div className={styles.container}>
                    <h3>Buat Password Baru</h3>
                    <p className={styles.desc}>Silahkan tambahkan password baru untuk login ke akun Anda.</p>
                    <Input type="password" placeholder="Password baru" validation={config.passwordPattern} onChange={setNewPassword}/>
                    <Input type="password" placeholder="Konfirmasi Password" error={confirmPassword !== undefined && newPassword !== confirmPassword} onChange={setConfirmPassword}/>
                    {error && <p className={styles.error}>{error}</p>}
                    <Button onClick={!loading && changePassword}>Kirim</Button>
                </div>}
            </main>
            {loading && <Loader/>}
        </>
    )
}
