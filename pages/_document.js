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
                </Head>
                <body tabIndex="-1">
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}