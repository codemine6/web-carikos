import {useState} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import {withNoAuth} from 'libs/Route'
import config from 'libs/config'
import styles from 'styles/auth.module.css'

import Head from 'next/head'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function Login() {
    const {dispatch} = useAuthContext()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleLogin() {
        setError()
        setLoading(true)
        try {
            const res = await API.post('/auth/login', {email, password})
            if (res.data.data._id) {
                dispatch(res.data.data)
                router.query?.from ? router.replace(`/${router.query.from}`) : router.replace('/')
            } else (
                router.replace('/verification?status=sended')
            )
        } catch (err) {
            setError(err.response?.data.message)
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.auth}>
                    <h1>Masuk</h1>
                    <Input type="email" placeholder="Email" validation={config.emailPattern} onChange={setEmail}/>
                    <Input type="password" placeholder="Password" validation={config.passwordPattern} onChange={setPassword}/>
                    <p className={styles.forgot} onClick={() => router.push('/forgot-password')}>Lupa password?</p>
                    <p className={styles.error}>{error}</p>

                    <Button onClick={!loading && handleLogin}>Masuk</Button>
                    <p>Belum Punya Akun? <b onClick={() => router.replace('/register')}>Daftar</b></p>
                </div>
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withNoAuth(() => ({props: {}}))