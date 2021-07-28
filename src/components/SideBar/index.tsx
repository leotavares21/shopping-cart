import { MdFavorite } from 'react-icons/md'
import { HiShoppingCart } from 'react-icons/hi'
import { Formik, Form, Field, FieldArray } from 'formik'
import { useEffect } from 'react'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useProduct } from '../../contexts/ProductContext'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './styles.module.scss'

export function SideBar() {
  const router = useRouter()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const {
    product,
    productColor,
    productCountry,
    productSize,
    handleSelectSize,
    handleSelectColor,
    handleSelectCountry,
    handleCartAdd,
    setThumbs,
    openSidebar,
    cartItems,
    totalValue
  } = useProduct()

  useEffect(() => {
    if (product) {
      product.images
        .filter(allImages => allImages.color === productColor)
        .map(data => setThumbs(data.imgs))
    }
  }, [productColor])



  return (
    <section
      className={`${styles.productContainer} ${
        openSidebar ? styles.activeSidebar : ''
      }`}
    >
      {product && router.pathname !== '/pagamento' ? (
        <>
          <header>
            <strong>{product.name}</strong>
            <strong>{product.model}</strong>
            <p>{product.category}</p>
            <span>R$ {product.price}</span>
          </header>

          <Formik
            initialValues={product}
            onSubmit={() =>
              handleCartAdd(
                product.name,
                product.category,
                product.price,
                product.model
              )
            }
          >
            <Form>
              <fieldset className={styles.colorOptions}>
                <legend>Escolha sua cor favorita</legend>
                <FieldArray
                  name="colors"
                  render={() => (
                    <>
                      {product.colors.map((color, index) => (
                        <label
                          key={index}
                          htmlFor={`colors.${index}`}
                          onClick={() => handleSelectColor(color)}
                        >
                          <Field
                            type="radio"
                            name={`colors.${index}`}
                            id={`colors.${index}`}
                            value={color}
                            style={{ backgroundImage: `url(${color}.svg)` }}
                            checked={productColor === color ? true : false}
                          />
                        </label>
                      ))}
                    </>
                  )}
                />
              </fieldset>

              <fieldset className={styles.sizeOptions}>
                <div className={styles.countrySize}>
                  <legend>Escolha seu tamanho</legend>
                  <div>
                    {product.sizes.map((size, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleSelectCountry(size.country)}
                        className={
                          productCountry === size.country
                            ? styles.countryActive
                            : ''
                        }
                      >
                        {size.country}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.productSize}>
                  {product.sizes.map((size, index) => {
                    if (size.country === productCountry) {
                      return (
                        <FieldArray
                          name="sizes"
                          key={index}
                          render={() => (
                            <>
                              {size.values.map((value, index2) => (
                                <label
                                  key={index2}
                                  onClick={() => handleSelectSize(value)}
                                  htmlFor={`sizes.${index2}`}
                                >
                                  <span>{value}</span>
                                  <span>{size.country}</span>
                                  <Field
                                    type="radio"
                                    value={value}
                                    id={`sizes.${index2}`}
                                    name={`sizes.${index2}`}
                                    checked={
                                      productSize === value ? true : false
                                    }
                                    disabled={
                                      product.soldOut.includes(value)
                                        ? true
                                        : false
                                    }
                                  />
                                </label>
                              ))}
                            </>
                          )}
                        />
                      )
                    }
                  })}
                </div>
              </fieldset>
              <div className={styles.productBtn}>
                <button type="submit">
                  <HiShoppingCart className={styles.icon} />
                  Adicionar
                </button>
                <button type="button">
                  <MdFavorite className={styles.icon} />
                  Favoritar
                </button>
              </div>
            </Form>
          </Formik>
        </>
      ) : (
        <div className={styles.paymentOptions}>
          <h2>Detalhes da compra</h2>

          <Slider {...settings} className={styles.carousel}>
            {cartItems.map((item, index) => (
              <div className={styles.slider}>
                <Image
                  width={300}
                  height={300}
                  key={index}
                  src={item.image}
                  alt={item.name}
                  objectFit={'contain'}
                />

                <div className={styles.optionsName}>
                  <div>
                    <strong>{item.name}</strong>
                    <strong>{item.model}</strong>
                  </div>
                  <span>{cartItems[index].quantity} par(es)</span>
                </div>

                <div className={styles.optionsInfo}>
                  <p>{item.category}</p>
                  <p>Cor: {item.color}</p>
                  <p>Tamanho: {item.size}</p>
                  <p>Preço: R$ {item.price}</p>
                </div>
              </div>
            ))}
          </Slider>

          <span>Total a pagar: R$ {totalValue}</span>
        </div>
      )}
    </section>
  )
}
