import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAuthContext} from 'contexts/AuthContext'
import API from 'libs/Api'
import useFetch from 'libs/useFetch'
import styles from 'styles/home.module.css'

import {ChevronBottom, ChevronTop} from 'libs/Icons'
import Head from 'next/head'
import Link from 'next/link'
import NavbarHome from 'components/NavbarHome/NavbarHome'
import Loader from 'components/Loader/Loader'
import SearchForm from 'components/SearchForm/SearchForm'
import RoomMenu from 'components/RoomMenu/RoomMenu'
import Carousel from 'components/Carousel/Carousel'
import RoomCard from 'components/RoomCard/RoomCard'

import PromoSkeleton from 'skeletons/PromoSkeleton/PromoSkeleton'
import RoomSkeleton from 'skeletons/RoomSkeleton/RoomSkeleton'

import cities from 'libs/cities.json'

export default function Home() {
    const {auth} = useAuthContext()
    const {data: promo} = useFetch('/promos')
    const {data: popular, isLoading} = useFetch('/rooms/popular')
    const [cityRooms, setCityRooms] = useState()
    const [type, setType] = useState()
    const [city, setCity] = useState('Bandung')
    const [citiesOpen, setCitiesOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            setCityRooms()
            try {
                const res = await API.get(`/rooms/city/${city}`)
                setCityRooms(res.data.data)
            } catch {}
        }
        fetchData()
    }, [city])

    return (
        <>
            <Head>
                <title>Carikos</title>
            </Head>
            <main>
                <NavbarHome/>
                <div className={styles.promo}>
                    {promo ? <Carousel autoplay>
                        {promo.map(promo => (
                            <img key={promo._id} src={promo.image} alt=""/>
                        ))}
                    </Carousel> : <PromoSkeleton/>}
                </div>

                <div onClick={() => router.push('/search')}><SearchForm/></div>
                <RoomMenu onChange={setType}/>

                {(auth === null || auth?.type === 'owner') &&
                <div className={styles.add}>
                    <p>Anda Pemilik Kost?</p>
                    <button onClick={() => router.push('/rooms')}>Pasang Iklan</button>
                </div>}

                <div className={styles.title}>
                    <h2>Kost Populer</h2>
                    <Link href="/rooms/popular"><a>Lihat semua</a></Link>
                </div>
                <div className={styles.list} id={!popular ? 'shimmer' : undefined}>
                    {popular ? popular.map(room => (
                        <RoomCard key={room._id} room={room}/>
                    )) : <><RoomSkeleton/><RoomSkeleton/></>}
                </div>

                <div className={styles.cities}>
                    <h3>Kost daerah</h3>
                    <div onClick={() => setCitiesOpen(!citiesOpen)}>
                        <span>{city}</span>
                        <i>{citiesOpen ? <ChevronTop/> : <ChevronBottom/>}</i>

                        {citiesOpen && <div className={styles.cityList}>
                            {cities.map((city, i) => (
                                <p key={i} onClick={() => setCity(city)}>{city}</p>
                            ))}
                        </div>}
                    </div>
                </div>

                {cityRooms?.length === 0 && <p className={styles.empty}>Upps, sepertinya belum ada kost di daerah ini.</p>}
                <div className={styles.list} id={!cityRooms ? 'shimmer' : undefined}>
                    {cityRooms ? cityRooms.map(room => (
                        <RoomCard key={room._id} room={room}/>
                    )) : <><RoomSkeleton/><RoomSkeleton/></>}
                </div>
            </main>
            {isLoading && <Loader/>}
        </>
    )
}