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

type ProductContextData = {
  product: Product
  productColor: string
  productCountry: string
  productSize: number
  openSidebar: boolean
  cartItems: { color: string; size: number; image: string; qtd: number }[]
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
  handleProductQtd: (index: number, number: number) => void
  handleCartAdd: () => void
  handleRemoveItemCart: (index: number) => void
  hasCartItems: () => void
  handleTotalValue: () => void
  setTotalValue: (value: string | number) => void
  setTitlePage: (title: string) => void
  setOpenSidebar: (open: boolean) => void
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
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [productColor, setProductColor] = useState('')
  const [productCountry, setProductCountry] = useState('')
  const [productSize, setProductSize] = useState(0)
  const [openSidebar, setOpenSidebar] = useState(false)
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
    if (router.pathname === '/') {
      setOpenSidebar(false)
    } else {
      setOpenSidebar(open)
    }
  }

  function handleProductQtd(index: number, qtd: number) {
    if (qtd > 10 || qtd < 1) {
      return
    } else {
      const newCartItems = [...cartItems]
      newCartItems[index].qtd = qtd
      setCartItems(newCartItems)
    }
  }

  function handleCartAdd() {
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
          color: productColor,
          size: productSize,
          image: `/${productColor}/${productColor}-air-jordan.png`,
          qtd: 1
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
    const totalQtd = cartItems.reduce((allItems, item) => allItems + item.qtd, 0)
    const price = Number(product.price.replace(',', '.'))
    const newTotalValue = (price * totalQtd).toFixed(2).replace('.', ',')

    setTotalValue(newTotalValue)
  }

  function hasCartItems() {
    if (sessionStorage.cartItems) {
      const items = sessionStorage.cartItems

      if (cartItems.length === 0) {
        setCartItems(JSON.parse(items))
      }else {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
      }
    } else {
      if (cartItems.length > 0) {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
      }
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
        totalValue,
        titlePage,
        cartItems,
        navIndex,
        thumbs,
        width,
        setProduct,
        handleSelectColor,
        handleSelectCountry,
        handleProductQtd,
        handleSelectSize,
        handleOpenSidebar,
        handleCartAdd,
        handleRemoveItemCart,
        setOpenSidebar,
        handleTotalValue,
        hasCartItems,
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
