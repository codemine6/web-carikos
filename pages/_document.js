import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="id">
                <Head>
                    <meta name="description" content="Cari, bayar, dan pesan kost dengan mudah"/>
                    <meta name="theme-color" content="#fff"/>
                    <link rel="apple-touch-icon" href="/icons/logo-144.png"/>
                    <link rel="icon" href="/icons/logo-144.png"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossOrigin=""/>
                </Head>
                <body tabIndex="-1">
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}