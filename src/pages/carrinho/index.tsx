import Image from 'next/image'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProduct } from '../../contexts/ProductContext'

import styles from './styles.module.scss'
import { GetStaticProps } from 'next'
import { api } from '../../services/api'

type Product = {
  id: string
  name: string
  model: string
  colors: string[]
  category: string
  price: string
  soldOut: number[]
  sizes: { country: string; values: number[] }[]
  images: { color: string; imgs: string[] }[]
}

type ProductProps = {
  product: Product
}

export default function Cart({ product }: ProductProps) {
  const router = useRouter()
  const {
    openSidebar,
    handleProductQuantity,
    handleRemoveItemCart,
    handleSelectColor,
    handleSelectCountry,
    handleTotalValue,
    setOpenSidebar,
    setProduct,
    cartItems,
    totalValue
  } = useProduct()

  useEffect(() => {
    setOpenSidebar(true)
    setProduct(product)
    handleSelectColor(product.colors[0])
    handleSelectCountry(product.sizes[0].country)
  }, [])

  useEffect(() => {
    handleTotalValue()
  }, [cartItems])

  return (
    <div
      className={`${styles.cartContainer} ${
        openSidebar ? styles.activeWideScreen : styles.deactivateWideScreen
      }`}
    >
      <Head>
        <title>Carrinho de compras</title>
      </Head>

      {cartItems.length > 0 ? (
        <>
          <section className={styles.cartOptions}>
            {cartItems.map((item, index) => (
              <table key={index}>
                <thead>
                  <tr>
                    <th>
                      <Image
                        width={350}
                        height={350}
                        src={item.image}
                        alt={item.name}
                        objectFit={'contain'}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{item.name}</strong>
                      <strong>{item.model}</strong>
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          handleProductQuantity(index, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={() => null}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleProductQuantity(index, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>{item.category}</p>
                      <p>Cor: {item.color}</p>
                      <p>Tamanho: {item.size}</p>
                      <p>Preço: R$ {item.price}</p>
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td>
                      <strong>R$ {'899,99'}</strong>
                      <button
                        type="button"
                        onClick={() => handleRemoveItemCart(index)}
                      >
                        &#10005;
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            ))}
          </section>
          <section className={styles.cartCheckout}>
            <h2>Valor total: R$ {totalValue}</h2>
            <button type="button" onClick={() => router.push('/pagamento')}>
              Pagar
            </button>
          </section>
        </>
      ) : (
        <div className={styles.cartEmpty}>
          <p>Carrinho Vazio</p>
        </div>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('shoe')

  const product = {
    id: data.id,
    name: data.name,
    model: data.model,
    colors: data.colors,
    category: data.category,
    soldOut: data.soldOut,
    price: data.price.replace('.', ','),
    sizes: data.sizes,
    images: data.images
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
