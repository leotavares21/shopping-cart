import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { HiShoppingCart } from 'react-icons/hi'
import { useProduct } from '../../contexts/ProductContext'

import styles from './styles.module.scss'
import { BiMenu } from 'react-icons/bi'

export function Header() {
  const router = useRouter()

  const {
    titlePage,
    setTitlePage,
    cartItems,
    setCartItems,
    handleOpenSidebar,
    openSidebar,
    width,
    setWidth
  } = useProduct()

  useEffect(() => {
    if (router.pathname === '/') {
      setTitlePage('Jordan Brand')
    } else {
      setTitlePage(document.title)
    }
  }, [router.pathname])

  useEffect(() => {
    useWidth()
    const cartFromStorage = JSON.parse(sessionStorage.getItem('cartItems')) || []
    setCartItems(cartFromStorage)
  }, [])

  useEffect(() => {
    if(cartItems.length > 0){
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  },[cartItems])


  function useWidth() {
    function updateWidth() {
      setWidth(window.screen.width)
    }
    window.addEventListener('resize', updateWidth)
    updateWidth()
    return () => window.removeEventListener('resize', updateWidth)
  }

  return (
    <header className={styles.headerContainer}>
      {width > 761 ? (
        <>
          <img
            src="/logo.png"
            alt="Jordan Brand"
            onClick={() => router.push('/')}
          />
          <h1>{titlePage}</h1>

          {router.pathname.includes('pagamento') ||
          router.pathname.includes('confirmação') ? (
            <ul className={styles.buyNav}>
              <li
                className={
                  router.pathname.includes('pagamento') ? styles.activeNav : ''
                }
              >
                1° passo: Pagamento
              </li>
              <li
                className={
                  router.pathname.includes('confirmação')
                    ? styles.activeNav
                    : ''
                }
              >
                2° passo: Confirmação
              </li>
            </ul>
          ) : (
            ''
          )}

          <nav>
            <ul>
              <li>
                <button type="button" onClick={() => router.push('/carrinho')}>
                  {cartItems.length > 0 && <span>{cartItems.length}</span>}
                  <HiShoppingCart />
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <button type="button" onClick={() => handleOpenSidebar(!openSidebar)}>
            <BiMenu className={styles.icon}/>
          </button>
          <img
            src="/logo.png"
            alt="Jordan Brand"
            onClick={() => router.push('/')}
          />
          <nav>
            <button>
              <MdFavorite />
            </button>
            <button onClick={() => router.push('/carrinho')}>
              {cartItems.length > 0 && <span>{cartItems.length}</span>}
              <HiShoppingCart />
            </button>
          </nav>
        </>
      )}
    </header>
  )
}
