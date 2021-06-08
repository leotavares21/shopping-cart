import React from 'react'
import { BiMenu } from 'react-icons/bi'
import { useProduct } from '../../contexts/ProductContext'

import styles from './footer.module.scss'

export function Footer() {
  const { handleOpenSidebar, openSidebar } = useProduct()

  return (
    <footer className={styles.footerContainer}>
      <ul>
        <li>
          <a href="#">Produtos</a>
        </li>
        <li>
          <a href="#">Loja</a>
        </li>
        <li>
          <a href="#">Artigos</a>
        </li>
        <li>
          <a href="#">Sobre</a>
        </li>
        <li onClick={() => handleOpenSidebar(!openSidebar)}>
          <a>
            Menu <BiMenu className={styles.icon} />
          </a>
        </li>
      </ul>
    </footer>
  )
}
