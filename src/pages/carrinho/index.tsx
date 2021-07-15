import Image from 'next/image'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProduct } from '../../contexts/ProductContext'

import styles from './styles.module.scss'

export default function Cart() {
  const router = useRouter()
  const {
    product,
    openSidebar,
    handleProductQtd,
    handleRemoveItemCart,
    handleTotalValue,
    hasCartItems,
    setOpenSidebar,
    cartItems,
    totalValue
  } = useProduct()

  useEffect(() => {
    setOpenSidebar(true)
  }, [])

  useEffect(() => {
    hasCartItems()
  }, [cartItems.length])

  useEffect(() => {
    handleTotalValue()
    console.log(totalValue)
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
                        alt={product.name}
                        objectFit={'contain'}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <div>
                      <td>
                        <strong>{product.name}</strong>
                        <strong>{product.model}</strong>
                      </td>
                      {console.log(cartItems)}
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            handleProductQtd(index, item.qtd - 1)
                          }
                        >
                          -
                        </button>
                        <input type="text" value={item.qtd} />
                        <button
                          type="button"
                          onClick={() =>
                            handleProductQtd(index, item.qtd + 1)
                          }
                        >
                          +
                        </button>
                      </td>
                    </div>

                    <td>
                      <p>{product.category}</p>
                      <p>Cor: {item.color}</p>
                      <p>Tamanho: {item.size}</p>
                      <p>Preço: R$ {product.price}</p>
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
