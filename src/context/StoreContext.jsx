import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useCallback,
} from 'react'
import { getProduct } from '../data/products'

const StoreContext = createContext(null)

const CART_KEY = 'cs4u_cart_v1'
const WISH_KEY = 'cs4u_wishlist_v1'
export const FREE_SHIPPING_THRESHOLD = 499
export const SHIPPING_FEE = 49

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const lineKey = (productId, colorName) => `${productId}__${colorName || 'default'}`

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { productId, colorName, qty } = action.payload
      const key = lineKey(productId, colorName)
      const existing = state.find((l) => l.key === key)
      if (existing) {
        return state.map((l) =>
          l.key === key ? { ...l, qty: Math.min(l.qty + qty, 20) } : l,
        )
      }
      return [...state, { key, productId, colorName, qty }]
    }
    case 'SET_QTY': {
      const { key, qty } = action.payload
      if (qty <= 0) return state.filter((l) => l.key !== key)
      return state.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 20) } : l))
    }
    case 'REMOVE':
      return state.filter((l) => l.key !== action.payload)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, () =>
    load(CART_KEY, []),
  )
  const [wishlist, setWishlist] = useState(() => load(WISH_KEY, []))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch {
      /* storage unavailable — demo still works in-memory */
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
    } catch {
      /* ignore */
    }
  }, [wishlist])

  const showToast = useCallback((message, opts = {}) => {
    setToast({ message, ...opts, id: Date.now() })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  useEffect(() => () => toastTimer.current && clearTimeout(toastTimer.current), [])

  const addToCart = useCallback(
    (productId, { colorName, qty = 1, open = true } = {}) => {
      const product = getProduct(productId)
      if (!product) return
      dispatch({ type: 'ADD', payload: { productId, colorName, qty } })
      showToast(`${product.name} added to bag`, { type: 'cart' })
      if (open) setDrawerOpen(true)
    },
    [showToast],
  )

  const updateQty = useCallback((key, qty) => {
    dispatch({ type: 'SET_QTY', payload: { key, qty } })
  }, [])

  const removeFromCart = useCallback((key) => {
    dispatch({ type: 'REMOVE', payload: key })
  }, [])

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const has = prev.includes(productId)
        const product = getProduct(productId)
        if (has) {
          showToast(`${product?.name ?? 'Item'} removed from wishlist`)
          return prev.filter((id) => id !== productId)
        }
        showToast(`${product?.name ?? 'Item'} saved to wishlist`, { type: 'wish' })
        return [...prev, productId]
      })
    },
    [showToast],
  )

  const isWished = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist],
  )

  const detailedCart = useMemo(
    () =>
      cart
        .map((line) => {
          const product = getProduct(line.productId)
          if (!product) return null
          return { ...line, product, lineTotal: product.price * line.qty }
        })
        .filter(Boolean),
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((n, l) => n + l.qty, 0),
    [cart],
  )
  const subtotal = useMemo(
    () => detailedCart.reduce((sum, l) => sum + l.lineTotal, 0),
    [detailedCart],
  )
  const shipping = useMemo(() => {
    if (subtotal === 0) return 0
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  }, [subtotal])
  const total = subtotal + shipping

  const openCart = useCallback(() => setDrawerOpen(true), [])
  const closeCart = useCallback(() => setDrawerOpen(false), [])

  const value = {
    cart: detailedCart,
    rawCart: cart,
    cartCount,
    subtotal,
    shipping,
    total,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist,
    isWished,
    drawerOpen,
    openCart,
    closeCart,
    toast,
    showToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
