import { MdFavorite } from 'react-icons/md'
import { HiShoppingCart } from 'react-icons/hi'
import { Formik, Form, Field, FieldArray } from 'formik'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useProduct } from '../../contexts/ProductContext'
import styles from './styles.module.scss'

export function SideBar() {
  const router = useRouter()

  const {
    product,
    productColor,
    productCountry,
    productSize,
    handleSelectSize,
    handleSelectColor,
    handleSelectCountry,
    handleCartAdd,
    handleProductNumber,
    setThumbs,
    width,
    thumbs,
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

          {width < 761 && (
            <section className={styles.carousel}>
              {thumbs.length > 0 && thumbs[0].includes(productColor) && (
                <Swiper
                  direction={'vertical'}
                  centeredSlides={true}
                  loop={true}
                  pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                      return `<span class='${className}'><Image width={40} height={40} src="${thumbs[index]}" alt='${product.name}' objectFit="contain" /></span> `
                    }
                  }}
                  className={styles.slider}
                  autoplay={{
                    delay: 8000,
                    disableOnInteraction: false
                  }}
                >
                  {product.images
                    .filter(allImages => allImages.color === productColor)
                    .map(data =>
                      data.imgs.map((image, index) => (
                        <SwiperSlide>
                          <Image
                            width={600}
                            height={600}
                            src={image}
                            alt={product.name}
                            objectFit="contain"
                          />
                        </SwiperSlide>
                      ))
                    )}
                </Swiper>
              )}
            </section>
          )}

          <Formik initialValues={product} onSubmit={handleCartAdd}>
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

          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 8000,
              disableOnInteraction: true
            }}
            className={styles.paymentList}
          >
            {cartItems.map((item, index) => (
              <SwiperSlide className={styles.slider}>
                <Image
                  width={350}
                  height={350}
                  src={item.image}
                  alt={product.name}
                  objectFit={'contain'}
                />
                {product && (
                  <div className={styles.optionsName}>
                    <div>
                      <strong>{product.name}</strong>
                      <strong>{product.model}</strong>
                    </div>
                    <span>{cartItems[index].qtd}</span>
                  </div>
                )}

                <div className={styles.optionsInfo}>
                  <p>{product.category}</p>
                  <p>Cor: {item.color}</p>
                  <p>Tamanho: {item.size}</p>
                  <p>Preço: R$ {product.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <strong>Total a pagar: R$ {totalValue}</strong>
        </div>
      )}
    </section>
  )
}
