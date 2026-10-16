// Site-wide content: navigation, announcements, benefits, testimonials, FAQ.
// Contact details reflect the real Case Solutions 4U brand.

export const brand = {
  name: 'Case Solutions 4U',
  shortName: 'CS4U',
  tagline: 'Premium cases, built for the phones you actually carry.',
  email: 'casesolutions4u@gmail.com',
  phone: '+91 79770 69466',
  phoneHref: 'tel:+917977069466',
  instagram: 'https://instagram.com',
  location: 'Shipping across India',
}

export const announcements = [
  'Free shipping on orders over ₹499',
  'Cash on delivery available',
  '7-day easy returns',
  'New arrivals every week',
]

export const primaryNav = [
  {
    label: 'iPhone',
    to: '/iphone',
    columns: [
      {
        heading: 'By model',
        links: [
          { label: 'iPhone 16', to: '/category/iphone-16' },
          { label: 'iPhone 15', to: '/category/iphone-15' },
          { label: 'iPhone 14', to: '/category/iphone-14' },
          { label: 'iPhone 13', to: '/category/iphone-13' },
        ],
      },
      {
        heading: 'By style',
        links: [
          { label: 'Silicone', to: '/shop?style=silicone' },
          { label: 'Leather', to: '/shop?style=leather' },
          { label: 'Clear & MagSafe', to: '/shop?style=clear' },
          { label: 'Fashion', to: '/category/fashion' },
        ],
      },
    ],
  },
  {
    label: 'Samsung',
    to: '/category/samsung',
    columns: [
      {
        heading: 'Galaxy',
        links: [
          { label: 'Galaxy S series', to: '/category/samsung' },
          { label: 'Galaxy A series', to: '/category/samsung' },
          { label: 'Clear cases', to: '/shop?style=clear' },
          { label: 'Leather cases', to: '/shop?style=leather' },
        ],
      },
    ],
  },
  {
    label: 'Accessories',
    to: '/shop',
    columns: [
      {
        heading: 'Protect',
        links: [
          { label: 'Tempered Glass', to: '/category/tempered-glass' },
          { label: 'Camera Rings', to: '/category/camera-rings' },
        ],
      },
      {
        heading: 'Power & carry',
        links: [
          { label: 'Power Banks', to: '/category/power-bank' },
          { label: 'OnePlus', to: '/category/oneplus' },
          { label: 'Fashion Accessories', to: '/category/fashion' },
        ],
      },
    ],
  },
  { label: 'Shop All', to: '/shop', columns: null },
  { label: 'About', to: '/about', columns: null },
]

export const benefits = [
  {
    icon: 'ship',
    title: 'Free shipping over ₹499',
    text: 'Dispatched within 24–48 hours, delivered across India.',
  },
  {
    icon: 'wallet',
    title: 'Flexible payment',
    text: 'Pay by UPI, card, or cash on delivery — your call.',
  },
  {
    icon: 'return',
    title: '7-day easy returns',
    text: 'Changed your mind? Easy exchanges on eligible items.',
  },
  {
    icon: 'support',
    title: 'Real human support',
    text: 'We reply within one business day — every time.',
  },
]

export const testimonials = [
  {
    quote:
      'The leather perfume case is unreal — it still smells lovely a month in and the stitching has not budged. Easily my favourite phone purchase this year.',
    name: 'Ananya R.',
    detail: 'Mumbai · iPhone 15 Pro',
    rating: 5,
  },
  {
    quote:
      'Ordered the silicone case in three colours. Soft-touch finish feels premium and the camera lip actually protects. Shipping was quick too.',
    name: 'Rohan M.',
    detail: 'Pune · Galaxy S24',
    rating: 5,
  },
  {
    quote:
      'The crossbody lanyard case changed my commute. Hands free, phone safe, and I get compliments on it constantly.',
    name: 'Simran K.',
    detail: 'Delhi · iPhone 14',
    rating: 5,
  },
  {
    quote:
      'Great clarity on the privacy glass and zero bubbles with the install frame. Support helped me pick the right model in minutes.',
    name: 'Karthik V.',
    detail: 'Bengaluru · iPhone 16 Pro',
    rating: 4,
  },
]

export const faqs = [
  {
    group: 'Orders & shipping',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Orders are dispatched within 24–48 hours. Most metro addresses receive their parcel in 2–4 business days, with the rest of India in 4–7 business days.',
      },
      {
        q: 'Is shipping really free?',
        a: 'Shipping is free on every order over ₹499. Orders below that carry a small flat fee shown transparently at checkout.',
      },
      {
        q: 'Do you offer cash on delivery?',
        a: 'Yes. You can pay by UPI, debit/credit card, or cash on delivery across most pin codes in India.',
      },
    ],
  },
  {
    group: 'Products & fit',
    items: [
      {
        q: 'How do I find the right case for my phone?',
        a: 'Pick your model from the navigation or the "Shop by phone" section. Each product lists the exact devices it fits. Still unsure? Message us and we will confirm.',
      },
      {
        q: 'Are your cases MagSafe compatible?',
        a: 'Many are. Look for the "MagSafe" note in the product highlights — silicone, clear and select leather cases include a magnet array.',
      },
      {
        q: 'Will the clear cases turn yellow?',
        a: 'Our clear and crystal cases use an anti-yellowing coating designed to stay clear far longer than standard TPU shells.',
      },
    ],
  },
  {
    group: 'Returns & support',
    items: [
      {
        q: 'What is your returns policy?',
        a: 'Unused items in original packaging can be returned or exchanged within 7 days of delivery. Reach out and we will arrange it.',
      },
      {
        q: 'My item arrived damaged — what now?',
        a: 'We are sorry! Send us a photo within 48 hours of delivery and we will ship a replacement right away at no cost.',
      },
    ],
  },
]

export const footerNav = [
  {
    heading: 'Shop',
    links: [
      { label: 'iPhone', to: '/iphone' },
      { label: 'Samsung', to: '/category/samsung' },
      { label: 'OnePlus', to: '/category/oneplus' },
      { label: 'Tempered Glass', to: '/category/tempered-glass' },
      { label: 'Power Banks', to: '/category/power-bank' },
      { label: 'Fashion', to: '/category/fashion' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Shipping & Returns', to: '/faq' },
      { label: 'Track Order', to: '/account' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Story', to: '/about' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'My Account', to: '/account' },
    ],
  },
]

export const policyLinks = [
  { label: 'Privacy Policy', to: '/faq' },
  { label: 'Terms of Service', to: '/faq' },
  { label: 'Replacement Policy', to: '/faq' },
]
