import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AiFillStar } from 'react-icons/ai'

import { api } from '../services/api'
import { useProduct } from '../contexts/ProductContext'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

import styles from './home.module.scss'

import SwiperCore, { Autoplay, Pagination } from 'swiper/core'

SwiperCore.use([Autoplay, Pagination])

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

type ProductBody = {
  images: { color: string; imgs: string[] }[]
  body: {
    description: string
    reasons: { text: string }[]
    pop_reviews: {
      user_img: string
      name: string
      value: number[]
      text: string
    }[]
  }
}

type HomeProps = {
  product: Product
  productBody: ProductBody
}

export default function Home({ product, productBody }: HomeProps) {
  const {
    productColor,
    width,
    thumbs,
    setProduct,
    setThumbs,
    handleSelectColor,
    setOpenSidebar,
    handleSelectCountry
  } = useProduct()

  useEffect(() => {
    setProduct(product)
    handleSelectColor(product.colors[0])
    handleSelectCountry(product.sizes[0].country)
  }, [])

  useEffect(() => {
    if (width > 761) {
      setOpenSidebar(false)
    }else {
      setOpenSidebar(true)
    }
  }, [width])

  useEffect(() => {
    productBody.images
      .filter(allImages => allImages.color === productColor)
      .map(data => setThumbs(data.imgs))
  }, [productColor])

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Jordan Brand</title>
      </Head>
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
              {productBody.images
                .filter(allImages => allImages.color === productColor)
                .map(data =>
                  data.imgs.map((image, index) => (
                    <SwiperSlide>
                      <Image
                        width={600}
                        height={600}
                        src={image}
                        alt={product.name}
                        title="image by artwalk.com.br"
                        objectFit="contain"
                      />
                    </SwiperSlide>
                  ))
                )}
            </Swiper>
          )}
        </section>


      <section className={styles.banner}>
        <Image
          width={350}
          height={350}
          src="/ajxxxv.png"
          alt="Air Jordan logo"
          objectFit="contain"
        />
        <p>{productBody.body.description}</p>
      </section>
      <section className={styles.reasons}>
        <h2>{productBody.body.reasons.length} Razões para comprar</h2>

        <Swiper
          slidesPerView={1.4}
          slidesPerGroupSkip={1}
          spaceBetween={25}
          breakpoints={{
            '768': {
              slidesPerView: 2,
              slidesPerGroupSkip: 2,
              spaceBetween: 20
            },
            '1024': {
              slidesPerView: 3,
              slidesPerGroupSkip: 1,
              spaceBetween: 25
            }
          }}
          pagination={{
            clickable: true
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false
          }}
          className={styles.reasonBody}
        >
          {productBody.body.reasons.map((reason, index) => (
            <SwiperSlide className={styles.reasonCard} key={index}>
              <span>{++index}</span>
              <p>{reason.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className={styles.reviews}>
        <h2>Principais analises</h2>
        <Swiper
          slidesPerView={1}
          slidesPerGroupSkip={1}
          pagination={{
            clickable: true
          }}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false
          }}
          className={styles.reviewBody}
        >
          {productBody.body.pop_reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <figure>
                <Image
                  width={150}
                  height={80}
                  src={review.user_img}
                  alt={review.name}
                  objectFit="cover"
                />
                <div>
                  <figcaption>{review.name}</figcaption>
                  {review.value.map((stars, index) => (
                    <span key={`star-${index}`}>
                      <AiFillStar />
                    </span>
                  ))}
                </div>
              </figure>
              <p>{review.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
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

  const productBody = {
    body: data.body,
    images: data.images
  }

  return {
    props: {
      product,
      productBody
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
