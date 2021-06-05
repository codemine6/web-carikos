import {useState, useEffect} from 'react'
import Router from 'next/router'
import {AuthContextProvider} from 'contexts/AuthContext'
import {RoomFormContextProvider} from 'contexts/RoomFormContext'
import 'styles/global.css'

import Loader from 'components/Loader/Loader'

export default function App({Component, pageProps}) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        Router.events.on('routeChangeStart', () => setLoading(true))
        Router.events.on('routeChangeComplete', () => setLoading(false))
        Router.events.on('routeChangeError', () => setLoading(false))

        return () => {
            Router.events.off('routeChangeStart', () => setLoading(true))
            Router.events.off('routeChangeComplete', () => setLoading(false))
            Router.events.off('routeChangeError', () => setLoading(false))
        }
    }, [])

    useEffect(() => {
        if (process.env.pwa === 'enable' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('ServiceWorker registered!'))
                .catch(() => console.log('ServiceWorker not registered!'))
        }
    }, [])

    return (
        <>
            {loading ? <main><Loader/></main> :
            <AuthContextProvider>
                <RoomFormContextProvider>
                    <Component {...pageProps}/>
                </RoomFormContextProvider>
            </AuthContextProvider>}
        </>
    )
}