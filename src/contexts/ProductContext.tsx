import { createContext, ReactNode, useContext, useState } from 'react'
import { useRouter } from 'next/router'

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

type Cart = {
  name: string
  price: string
  category: string
  model: string
  color: string
  size: number
  image: string
  quantity: number
}

type ProductContextData = {
  product: Product
  productColor: string
  productCountry: string
  productSize: number
  openSidebar: boolean
  cartItems: Cart[]
  totalValue: string | number
  titlePage: string
  thumbs: string[]
  width: number
  setProduct: (product: Product) => void
  setCartItems: (item) => void
  handleSelectColor: (color: string) => void
  handleSelectCountry: (country: string) => void
  handleSelectSize: (size: number) => void
  handleOpenSidebar: (open: boolean) => void
  handleProductQuantity: (index: number, number: number) => void
  handleCartAdd: (
    name: string,
    category: string,
    price: string,
    model: string
  ) => void
  handleRemoveItemCart: (index: number) => void
  handleTotalValue: () => void
  setTotalValue: (value: string | number) => void
  setTitlePage: (title: string) => void
  setOpenSidebar: (open: boolean) => void
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
  const [totalValue, setTotalValue] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [titlePage, setTitlePage] = useState('')
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

  function handleProductQuantity(index: number, quantity: number) {
    if (quantity > 10 || quantity < 1) {
      return
    } else {
      const newCartItems = [...cartItems]
      newCartItems[index].quantity = quantity
      setCartItems(newCartItems)
    }
  }

  function handleCartAdd(
    name: string,
    category: string,
    price: string,
    model: string
  ) {
    if (!productSize) {
      alert('Nenhum tamanho selecionado!')
    } else {
      const checkSize = cartItems.find(
        item => item.size === productSize && item.color === productColor
      )
      if (checkSize) {
        alert('O tamanho já foi selecionado')
      } else {
        const item = {
          name,
          category,
          price,
          model,
          color: productColor,
          size: productSize,
          image: `/${productColor}/${productColor}-air-jordan.png`,
          quantity: 1
        }

        setCartItems([...cartItems, item])
      }
    }
  }

  function handleRemoveItemCart(index: number) {
    const newItem = cartItems.filter((item, itemIndex) => itemIndex !== index)
    setCartItems(newItem)
    sessionStorage.setItem('cartItems', JSON.stringify(newItem))
  }

  function handleTotalValue() {
    if (cartItems.length > 0 && product) {
      const totalQuantity = cartItems.reduce(
        (allItems, item) => allItems + item.quantity,
        0
      )
      const price = Number(product.price.replace(',', '.'))
      const newTotalValue = (price * totalQuantity).toFixed(2).replace('.', ',')

      setTotalValue(newTotalValue)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        productColor,
        productCountry,
        productSize,
        openSidebar,
        totalValue,
        titlePage,
        cartItems,
        thumbs,
        width,
        setProduct,
        handleSelectColor,
        handleSelectCountry,
        handleProductQuantity,
        handleSelectSize,
        handleOpenSidebar,
        handleCartAdd,
        handleRemoveItemCart,
        setOpenSidebar,
        handleTotalValue,
        setCartItems,
        setTotalValue,
        setTitlePage,
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
