import { createContext, ReactNode, useContext, useState } from 'react'

type Product = {
  id: string
  name: string
  model: string
  colors: string[]
  category: string
  price: string
  soldOut: number[]
  images: { color: string; imgs: string[] }[]
  sizes: { country: string; values: number[] }[]
}

type ProductContextData = {
  product: Product
  productColor: string
  productCountry: string
  productSize: number
  openSidebar: boolean
  productNumber: number
  cartItems: { color: string; size: number; image: string; number: number }[]
  totalValue: string | number
  titlePage: string
  thumbs: string[]
  navIndex: number
  width: number
  setProduct: (product: Product) => void
  handleSelectColor: (color: string) => void
  handleSelectCountry: (country: string) => void
  handleSelectSize: (size: number) => void
  handleOpenSidebar: (open: boolean) => void
  handleProductNumber: (index: number, number: number) => void
  handleCartContent: () => void
  handleRemoveItemCart: (index: number) => void
  handleTotalValue: () => void
  setTotalValue: (value: string | number) => void
  setTitlePage: (title: string) => void
  openNav: (index: number) => void
  setThumbs: (imgs: string[]) => void
  setWidth: (width: number) => void
}

export const ProductContext = createContext({} as ProductContextData)

type ProductContextProviderProps = {
  children: ReactNode
}

export function ProductContextProvider({
  children
}: ProductContextProviderProps) {
  const [product, setProduct] = useState(null)
  const [productColor, setProductColor] = useState('')
  const [productCountry, setProductCountry] = useState('')
  const [productSize, setProductSize] = useState(0)
  const [openSidebar, setOpenSidebar] = useState(false)
  const [productNumber, setProductNumber] = useState(1)
  const [totalValue, setTotalValue] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [titlePage, setTitlePage] = useState('')
  const [navIndex, setNavIndex] = useState(-1)
  const [thumbs, setThumbs] = useState([])
  const [width, setWidth] = useState(null)

  function handleSelectColor(color: string) {
    setProductColor(color)
  }

  function handleSelectCountry(country: string) {
    setProductCountry(country)
  }

  function handleSelectSize(value: number) {
    setProductSize(value)
  }

  function handleOpenSidebar(open: boolean) {
    setOpenSidebar(open)
  }

  function handleProductNumber(index: number, number: number) {
    if (number > 10 || number < 1) {
      return
    } else {
      const newCartItems = [...cartItems]
      newCartItems[index].number = number
      setCartItems(newCartItems)
    }

    if (cartItems.length > 1) {
      cartItems.reduce((allItems, item) => {
        const allSumNumbers = allItems.number + item.number
        const price = Number(product.price.replace(',', '.'))
        const newTotalValue = price * allSumNumbers
        setTotalValue(newTotalValue.toFixed(2).replace('.', ','))
      })
    } else {
      const price = Number(product.price.replace(',', '.'))
      const newTotalValue = cartItems[0].number * price
      setTotalValue(newTotalValue.toFixed(2).replace('.', ','))
    }
  }

  function handleCartContent() {
    if (cartItems.length > 0) {
      const items = {
        color: productColor,
        size: productSize,
        image: `/${productColor}/${productColor}-air-jordan.png`,
        number: 1
      }
      setCartItems([...cartItems, items])
    } else {
      const items = {
        color: productColor,
        size: productSize,
        image: `/${productColor}/${productColor}-air-jordan.png`,
        number: 1
      }

      setCartItems([...cartItems, items])
    }
  }

  function handleRemoveItemCart(index: number) {
    const newItems = cartItems.filter((item, itemIndex) => itemIndex !== index)
    if (newItems.length > 1) {
      newItems.reduce((allItems, item) => {
        const allSumNumbers = allItems.number + item.number
        const price = Number(product.price.replace(',', '.'))
        const newTotalValue = price * allSumNumbers
        setTotalValue(newTotalValue.toFixed(2).replace('.', ','))
      })
    } else {
      const price = Number(product.price.replace(',', '.'))
      const newTotalValue = cartItems[0].number * price
      setTotalValue(newTotalValue.toFixed(2).replace('.', ','))
    }
    setCartItems(newItems)
  }

  function handleTotalValue() {
    const price = Number(product.price.replace(',', '.'))
    if (cartItems.length > 0) {
      const newTotalValue = (price * cartItems.length)
        .toFixed(2)
        .replace('.', ',')

      setTotalValue(newTotalValue)
    } else {
      const newTotalValue = (price * productNumber).toFixed(2).replace('.', ',')

      setTotalValue(newTotalValue)
    }
  }

  function openNav(index: number) {
    setNavIndex(index)
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        productColor,
        productCountry,
        productSize,
        openSidebar,
        productNumber,
        totalValue,
        titlePage,
        cartItems,
        navIndex,
        thumbs,
        width,
        setProduct,
        handleSelectColor,
        handleSelectCountry,
        handleProductNumber,
        handleSelectSize,
        handleOpenSidebar,
        handleCartContent,
        handleRemoveItemCart,
        handleTotalValue,
        setTotalValue,
        setTitlePage,
        openNav,
        setThumbs,
        setWidth
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}
