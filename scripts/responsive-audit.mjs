// Responsive audit: true-viewport emulation via puppeteer-core + installed Chrome.
// Reports horizontal overflow per page/width and saves full-page screenshots.
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.env.BASE || 'http://127.0.0.1:5174'
const OUT = process.argv[2] || './audit'
mkdirSync(OUT, { recursive: true })

const WIDTHS = [360, 390, 768, 1024, 1280, 1440]
const PAGES = [
  ['home', '/'],
  ['shop', '/shop'],
  ['category', '/category/iphone-16'],
  ['product', '/product/ny-perfume-leather-iphone'],
  ['cart', '/cart'],
  ['checkout', '/checkout'],
  ['login', '/login'],
  ['account', '/account'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['faq', '/faq'],
]
const SHOOT = new Set(['home', 'shop', 'product', 'about'])

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})

let problems = 0
for (const w of WIDTHS) {
  const isMobile = w < 768
  for (const [name, path] of PAGES) {
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1, isMobile })
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 20000 })
      await new Promise((r) => setTimeout(r, 400))
      const info = await page.evaluate(() => {
        const iw = window.innerWidth
        const doc = document.documentElement
        const scrollW = Math.max(doc.scrollWidth, document.body.scrollWidth)
        const offenders = []
        if (scrollW > iw + 1) {
          const all = document.querySelectorAll('*')
          for (const el of all) {
            const r = el.getBoundingClientRect()
            if (r.width > 0 && r.right > iw + 1.5 && r.left < iw) {
              offenders.push({
                tag: el.tagName.toLowerCase(),
                cls: (el.className && el.className.toString().slice(0, 40)) || '',
                right: Math.round(r.right),
              })
            }
          }
        }
        // de-dup deepest offenders
        const seen = new Set()
        const top = offenders
          .sort((a, b) => b.right - a.right)
          .filter((o) => {
            const k = o.tag + o.cls
            if (seen.has(k)) return false
            seen.add(k)
            return true
          })
          .slice(0, 5)
        return { iw, scrollW, overflow: scrollW - iw, top }
      })
      const flag = info.overflow > 1 ? 'OVERFLOW' : 'ok'
      if (info.overflow > 1) {
        problems++
        console.log(`[${flag}] ${w}px ${name.padEnd(9)} scrollW=${info.scrollW} vw=${info.iw} (+${info.overflow})`)
        info.top.forEach((o) => console.log(`         └ <${o.tag} class="${o.cls}"> right=${o.right}`))
      } else {
        console.log(`[ok]       ${w}px ${name}`)
      }
      if (SHOOT.has(name) && [390, 768, 1440].includes(w)) {
        await page.screenshot({ path: `${OUT}/${name}-${w}.png`, fullPage: true })
      }
    } catch (e) {
      console.log(`[ERR] ${w}px ${name}: ${e.message}`)
      problems++
    }
    await page.close()
  }
}

await browser.close()
console.log(`\nAudit complete. ${problems ? problems + ' problem(s) found.' : 'No overflow problems.'}`)
process.exit(0)
