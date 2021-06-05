import {useState} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import {withAuth} from 'libs/Route'
import API, {getData} from 'libs/Api'
import styles from 'styles/editProfile.module.css'

import {Camera} from 'libs/Icons'
import Head from 'next/head'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

import cities from 'libs/cities.json'

export default function Edit({user}) {
    const {auth, dispatch} = useAuthContext()
    const [profileImage, setProfileImage] = useState(user.profileImage)
    const [username, setUsername] = useState(user.username)
    const [phone, setPhone] = useState(user.phone)
    const [city, setCity] = useState(user?.city ?? '')
    const [list, setList] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    function changeImage(e) {
        if (e.target.files.length === 0) return
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = async img => {
            setProfileImage(img.target.result)
            setUploading(true)
            try {
                const res = await API.patch('/users', {profileImage: img.target.result})
                dispatch({...auth, ...res.data.data})
            } catch {} finally {setUploading(false)}
        }
    }

    function changeCity(e) {
        const value = e.target.value
        const result = cities.filter(city => city.toLowerCase().includes(value.toLowerCase()))
        result.length === 0 && setError('Kota tidak ditemukan')
        setCity(value)
        setList(result)
    }

    function selectCity(city) {
        setCity(city)
        setList()
    }

    async function saveProfile() {
        setError()
        setLoading(true)
        try {
            const res = await API.patch('/users', {username, phone, city})
            dispatch({...auth, ...res.data.data})
            router.back()
        } catch (err) {
            setError(err.response?.data.message)
        } finally {setLoading(false)}
    }

    return (
        <>
            <Head>
                <title>Edit Profile</title>
            </Head>
            <main>
                <Navbar/>
                <div className={styles.photo}>
                    <img src={profileImage} alt=""/>
                    <label htmlFor="input"><Camera/> {uploading ? 'Menyimpan..' : 'Ubah Foto'}</label>
                    <input id="input" type="file" accept="image/*" onChange={changeImage}/>
                </div>
                <div className={styles.form}>
                    <label>Nama Pengguna</label>
                    <input value={username} onChange={e => setUsername(e.target.value)}/>
                    <label>Telepon</label>
                    <input type="number" value={phone} onChange={e => setPhone(e.target.value)}/>
                </div>
                <div className={styles.city}>
                    <label>Kota</label>
                    <input value={city ?? auth.city} onChange={changeCity}/>
                    {list?.length && <div className={styles.list}>
                        {list.map((city, i) => (
                            <p onClick={() => selectCity(city)} key={i}>{city}</p>
                        ))}
                    </div>}
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <Button id={styles.save} onClick={!loading && saveProfile}>{loading ? 'Menyimpan..' : 'Simpan'}</Button>
            </main>
            {loading && <Loader/>}
        </>
    )
}

export const getServerSideProps = withAuth(async context => {
    try {
        const res = await getData('/users/profile', context)
        return {props: {user: res.data.data}}
    } catch {
        return {notFound: true}
    }
})