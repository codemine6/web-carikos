import {useState} from 'react'
import {withAuth} from 'libs/Route'
import API from 'libs/Api'
import config from 'libs/config'
import styles from 'styles/setPassword.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function SetPassword() {
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    async function setPassword() {
        setError()
        setLoading(true)
        try {
            await API.patch('/set-password', {oldPassword, newPassword})
        } catch (err) {
            setError(err.response?.data.message)
        } finally {setLoading(false)}
    }

    return (
        <>
            <Head>
                <title>Rubah Password</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.container}>
                    <h3>Ubah password</h3>
                    <Input type="password" placeholder="Password sebelumnya" validation={config.passwordPattern} onChange={setOldPassword}/>
                    <h4>Password Baru</h4>
                    <Input type="password" placeholder="Password baru" validation={config.passwordPattern} onChange={setNewPassword}/>
                    <Input type="password" placeholder="Konfirmasi password baru" error={confirmPassword !== undefined && newPassword !== confirmPassword} onChange={setConfirmPassword}/>

                    {error && <p className={styles.error}>{error}</p>}
                    <Button onClick={!loading && setPassword}>Simpan</Button>
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}
export const getServerSideProps = withAuth(() => ({props: {}}))