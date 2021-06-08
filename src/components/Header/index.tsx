import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { HiShoppingCart } from 'react-icons/hi'
import { useProduct } from '../../contexts/ProductContext'

import styles from './styles.module.scss'
import { BiMenu } from 'react-icons/bi'

export function Header() {
  const router = useRouter()
  const navRef = useRef<HTMLLIElement>(null)
  const navRef2 = useRef<HTMLLIElement>(null)
  const navRef3 = useRef<HTMLLIElement>(null)
  const navRef4 = useRef<HTMLButtonElement>(null)
  const navRef5 = useRef<HTMLButtonElement>(null)
  const navRef6 = useRef<HTMLButtonElement>(null)

  const {
    navIndex,
    openNav,
    titlePage,
    setTitlePage,
    cartItems,
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
  }, [])

  useEffect(() => {
    if (width > 761) {
      const handleClick = e => {
        if (
          navRef.current.contains(e.target) ||
          navRef2.current.contains(e.target) ||
          navRef3.current.contains(e.target)
        ) {
          return
        } else {
          openNav(null)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    } else {
      const handleClick = e => {
        if (
          navRef4.current.contains(e.target) ||
          navRef5.current.contains(e.target) ||
          navRef6.current.contains(e.target)
        ) {
          return
        } else {
          openNav(null)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }
  }, [width])

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
              <li ref={navRef}>
                <button type="button" onClick={() => openNav(0)}>
                  <FiSearch />
                </button>
                <div className={navIndex === 0 ? styles.activeNav : ''}>
                  <input type="text" placeholder="Buscar..." />
                </div>
              </li>

              <li ref={navRef2}>
                <button type="button" onClick={() => openNav(1)}>
                  <FaUserAlt />
                </button>
                <div className={navIndex === 1 ? styles.activeNav : ''}>
                  <a href="#">conta</a>
                  <a href="#">avisos</a>
                  <a href="#">sair</a>
                </div>
              </li>

              <li ref={navRef3}>
                <button type="button" onClick={() => openNav(2)}>
                  <span>1</span>
                  <MdFavorite />
                </button>
                <div className={navIndex === 2 ? styles.activeNav : ''}>
                  <a href="#">
                    <strong>product</strong> <span>x</span>
                  </a>
                </div>
              </li>

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
          <button ref={navRef4}>
            <BiMenu className={styles.icon} />
          </button>
          <img
            src="/logo.png"
            alt="Jordan Brand"
            onClick={() => router.push('/')}
          />
          <nav>
            <button ref={navRef5}>
              <MdFavorite />
            </button>
            <button ref={navRef6} onClick={() => router.push('/carrinho')}>
              {cartItems.length > 0 && <span>{cartItems.length}</span>}
              <HiShoppingCart />
            </button>
          </nav>
        </>
      )}
    </header>
  )
}
