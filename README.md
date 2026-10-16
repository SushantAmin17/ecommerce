# Case Solutions 4U — Storefront UI

A premium, editorial **frontend-only** e-commerce UI for **Case Solutions 4U** —
phone cases & accessories (iPhone, Samsung, OnePlus, tempered glass, power banks,
camera rings, fashion carry). Built with **React + Vite**, hand-crafted CSS
design system (navy + champagne gold + warm ivory), no backend.

> Frontend UI only — no backend, database, API, payment gateway, real auth or
> admin. Cart & wishlist persist in `localStorage`; checkout is a demo.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to **http://localhost:5173**).

Other scripts:

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build
npm run lint      # eslint
```

## Your logo

A crafted navy + gold SVG badge is used by default so nothing looks unbranded.
To use your **real circular logo**, drop the image here:

```
public/logo.png
```

It is picked up automatically everywhere the logo appears (header, footer,
mobile menu, auth). No code change needed. (SVG also works if you adjust the
path in `src/components/ui/Logo.jsx`.)

## Pages

Home · Shop (All Products) · Categories · Category · Product Details ·
Search Results · Wishlist · Cart · Checkout · Login/Sign-up · Account ·
About · Contact · FAQ · 404.

## Project structure

```
src/
  components/
    layout/    AnnouncementBar, Header, MobileMenu, Footer
    cart/      CartDrawer
    product/   ProductCard, ProductListing (filters + sort)
    ui/        Logo, Icon, CaseRender, SmartImage, Reveal, Rating,
               QuantityStepper, SectionHeader, Newsletter, Toast, …
  context/     StoreContext (cart + wishlist + toast, localStorage)
  data/        products, categories, site content (sample data)
  hooks/       useInView (scroll reveal)
  pages/       one file per route
  styles/      tokens → base → components → pages → responsive
```

## Notes on imagery

Product visuals are rendered as on-brand SVG "studio" illustrations
(`CaseRender`) so they are always relevant and never a broken link. To use real
photography instead, add a `photo` URL to a product in `src/data/products.js`
and extend `ProductCard` to prefer it (an image fallback helper, `SmartImage`,
is already included).

Sample product names, categories, pricing (₹ INR) and contact details reflect
the real Case Solutions 4U brand; reviews are clearly labelled sample content.
