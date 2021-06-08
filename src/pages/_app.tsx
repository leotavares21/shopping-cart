import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { Footer } from '../components/Footer'
import { ProductContextProvider } from '../contexts/ProductContext'

function MyApp({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <SideBar />
        <Footer />
      </div>
    </ProductContextProvider>
  )
}

export default MyApp
