import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useFormContext} from 'contexts/RoomFormContext'
import API from 'libs/Api'
import {withOwnerAuth} from 'libs/Route'
import styles from 'styles/addRoom.module.css'

import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Loader from 'components/Loader/Loader'
import Button from 'components/Button/Button'
import RoomForm from 'components/RoomForm/RoomForm'

export default function Edit() {
    const {form, dispatch} = useFormContext()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    async function editKost() {
        setLoading(true)
        try {
            await API.patch(`/rooms/${router.query.id}`, form)
            router.back()
        } catch (err) {
            setError(err.response?.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await API.get(`/rooms/${router.query.id}`)
                dispatch({type: 'SET_ALL', payload: res.data.data})
            } catch {} finally{setLoading(false)}
        }
        fetchData()
    }, [router.query.id, dispatch])

    return (
        <>
            <Head>
                <title>Edit Room</title>
            </Head>
            <main>
                <Navbar/>
                {form.name && <div className={styles.container}>
                    <RoomForm/>
                    <p className={styles.error}>{error}</p>
                    <Button onClick={!loading && editKost}>{loading ? 'Menyimpan..' : 'Edit'}</Button>
                </div>}
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withOwnerAuth(() => ({props: {}}))