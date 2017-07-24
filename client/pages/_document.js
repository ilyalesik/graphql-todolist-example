import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import '../styles/globals'

export default class MyDocument extends Document {
    static async getInitialProps (context) {
        const props = await super.getInitialProps(context)
        const {req: {locale, localeDataScript}} = context
        return {
            ...props,
            locale,
            localeDataScript
        }
    }
    render () {
        const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;

        const sheet = new ServerStyleSheet()
        const main = sheet.collectStyles(<Main />)
        const styleTags = sheet.getStyleElement()
        return (
            <html>
            <Head>
                <title>My page</title>
                <link rel='stylesheet' href='/static/css/bundle.css' />
                {styleTags}
            </Head>
            <body>
                <div className='root'>
                    {main}
                </div>
                <script src={polyfill} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: this.props.localeDataScript
                    }}
                />
                <NextScript />
            </body>
            </html>
        )
    }
}