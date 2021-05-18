import {useState} from 'react'
import {useRouter} from 'next/router'
import API from 'libs/Api'
import {withNoAuth} from 'libs/Route'
import config from 'libs/config'
import styles from 'styles/auth.module.css'

import Head from 'next/head'
import Input from 'components/Input/Input'
import Select from 'components/Select/Select'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function Register() {
    const [username, setUsername] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [type, setType] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleRegister() {
        setLoading(true)
        setError()
        try {
            await API.post('/auth/register', {username, phone, email, password, type})
            router.replace('/verification?status=sended')
        } catch (err) {
            setError(err.response?.data.message)
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.auth}>
                    <h1>Daftar</h1>
                    <Input placeholder="Nama Pengguna" validation={config.usernamePattern} onChange={setUsername}/>
                    <Input type="number" placeholder="Telepon" validation={config.phonePattern} onChange={setPhone}/>
                    <Input type="email" placeholder="Email" validation={config.emailPattern} onChange={setEmail}/>
                    <Input type="password" placeholder="Password" validation={config.passwordPattern} onChange={setPassword}/>
                    <label>Daftar sebagai</label>
                    <Select onChange={setType}>
                        <option value="owner">Pemilik Kost</option>
                        <option value="customer">Pencari Kost</option>
                    </Select>
                    <p className={styles.error}>{error}</p>

                    <Button onClick={!loading && handleRegister}>Daftar</Button>
                    <p>Sudah Punya Akun? <b onClick={() => router.replace('/login')}>Masuk</b></p>
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withNoAuth(() => ({props: {}}))