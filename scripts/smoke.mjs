// SSR smoke test: renders every route to catch runtime render errors.
import { createServer } from 'vite'

// Minimal browser shims used during component init (render phase only).
const store = {}
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => {
    store[k] = String(v)
  },
  removeItem: (k) => {
    delete store[k]
  },
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

const routes = [
  '/',
  '/shop',
  '/shop?tag=new-arrival',
  '/categories',
  '/category/iphone-16',
  '/category/does-not-exist',
  '/product/ny-perfume-leather-iphone',
  '/product/missing-product',
  '/search?q=leather',
  '/search?q=',
  '/wishlist',
  '/cart',
  '/checkout',
  '/login',
  '/account',
  '/about',
  '/contact',
  '/faq',
  '/totally-unknown-route',
]

let failed = false
try {
  const mod = await vite.ssrLoadModule('/scripts/smoke-entry.jsx')
  const results = mod.renderAll(routes)
  results.forEach((r) => console.log(`OK  ${String(r.len).padStart(6)}  ${r.route}`))
  console.log(`\nAll ${results.length} routes rendered without errors.`)
} catch (e) {
  failed = true
  console.error('RENDER ERROR:\n', e)
} finally {
  await vite.close()
}
process.exit(failed ? 1 : 0)
