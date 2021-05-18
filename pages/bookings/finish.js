import {useRouter} from 'next/router'
import API from 'libs/Api'
import {withCustomerAuth} from 'libs/Route'
import styles from 'styles/bookingFinish.module.css'

import {Check, Copy} from 'libs/Icons'
import Head from 'next/head'
import Button from 'components/Button/Button'
import Toast from 'components/Toast/Toast'

export default function Finish({booking}) {
    const router = useRouter()

    function copyCode() {
        navigator.clipboard.writeText(booking.bookingCode)
    }

    return (
        <>
            <Head>
                <title>Pesanan Selesai</title>
            </Head>
            <main>
                <div className={styles.container}>
                    <i className={styles.checkIcon}><Check/></i>
                    <h4>Pesananmu akan segera diproses oleh pemilik kost</h4>
                    <div className={styles.detail}>
                        <h4>Total</h4>
                        <p  className={styles.price}>Rp. {booking.payment.total.toLocaleString('id-ID')}</p>
                        <h4>Kode Pesanan</h4>
                        <div className={styles.code}>
                            <p>{booking.details.code}</p>
                            <Toast message="Kode berhasil disalin!">
                                <i onClick={copyCode}><Copy/></i>
                            </Toast>
                        </div>
                    </div>
                    <div className={styles.action}>
                        <Button onClick={() => router.back()}>Selesai</Button>
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = withCustomerAuth(async context => {
    try {
        const cookie = context.req.headers.cookie
        const res = await API.get(`/bookings/${context.query.booking}`, {headers: {cookie}})
        return {props: {booking: res.data.data}}
    } catch {
        return {notFound: true}
    }
})