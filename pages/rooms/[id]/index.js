import {useState} from 'react'
import {useRouter} from 'next/router'
import API from 'libs/Api'
import styles from 'styles/roomDetail.module.css'

import Head from 'next/head'
import NavbarDetail from 'components/NavbarDetail/NavbarDetail'
import Loader from 'components/Loader/Loader'
import Alert from 'components/Alert/Alert'
import Carousel from 'components/Carousel/Carousel'
import RoomDetailMain from 'components/RoomDetailMain/RoomDetailMain'
import RoomDetailReview from 'components/RoomDetailReview/RoomDetailReview'
import RoomFacilities from 'components/RoomFacilities/RoomFacilities'
import RoomAction from 'components/RoomAction/RoomAction'
import UserSummary from 'components/UserSummary/UserSummary'

export default function RoomsDetail({room}) {
    const [loading, setLoading] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [alert, setAlert] = useState(false)
    const router = useRouter()

    async function startChat() {
        setLoading(true)
        try {
            const res = await API.post('/chats/start', {user: room.owner._id})
            router.push(`/chats/${res.data.data._id}`)
        } catch (err) {
            err.response?.status === 403 && setAlert(true)
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>{room?.name ?? 'Carikos'}</title>
            </Head>
            <main>
                <NavbarDetail/>
                <div className={styles.images}>
                    <Carousel>
                        {room.images.map((img, i) => (
                            <img src={img} alt="" key={i}/>
                        ))}
                    </Carousel>
                </div>
                <div className={styles.detail}>
                    <RoomDetailMain room={room}/>
                    <RoomFacilities facilities={room.facilities}/>
                    <div className={styles.description}>
                        <h4>Deskripsi</h4>
                        <p className={showAll ? styles.showAll : null}>{room.description}</p>
                        <span onClick={() => setShowAll(!showAll)}>{showAll ? 'Sembunyikan' : 'Selengkapnya'}</span>
                    </div>
                    <div className={styles.owner}>
                        <UserSummary user={room.owner}/>
                    </div>
                    {room.review && <RoomDetailReview review={room.review} count={room.reviewCount}/>}
                </div>
                <RoomAction room={room} startChat={startChat}/>
            </main>
            {loading && <Loader/>}
            {alert && <Alert
                message="Untuk melanjutkan silahkan login terlebih dahulu!"
                navigate={() => router.replace(`/login?from=${router.asPath.substr(1)}`)}
                onClose={() => setAlert(false)}
            />}
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const res = await API.get(`/rooms/${context.query.id}/detail`)
        return {props: {room: res.data.data}}
    } catch {
        return {notFound: true}
    }
}