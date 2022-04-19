import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MYDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charset="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Open+Sans:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/fav-icon.svg" type="image/svg" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
