import {useState} from 'react'
import {useRouter} from 'next/router'
import {useFormContext} from 'contexts/RoomFormContext'
import API from 'libs/Api'
import {withOwnerAuth} from 'libs/Route'
import styles from 'styles/addRoom.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import RoomForm from 'components/RoomForm/RoomForm'

export default function Add() {
    const {form} = useFormContext()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function addRoom() {
        setError()
        setLoading(true)
        try {
            await API.post('/rooms', form)
            router.back()
        } catch (err) {
            setError(err.response?.data.message)
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Add Room</title>
            </Head>
            <main>
                <Navbar/>
                {form && <div className={styles.container}>
                    <RoomForm error={error}/>
                    <p className={styles.error}>{error}</p>
                    <Button onClick={!loading && addRoom}>{loading ? 'Menyimpan..' : 'Tambah'}</Button>
                </div>}
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withOwnerAuth(() => ({props: {}}))