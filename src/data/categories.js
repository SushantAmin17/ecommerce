// Product categories for Case Solutions 4U.
// `kind` maps to an icon in <CategoryIcon/>. `tone` drives the swatch gradient.
export const categories = [
  {
    slug: 'iphone-16',
    name: 'iPhone 16',
    kind: 'iphone',
    tagline: 'For the latest flagship',
    tone: 'navy',
    count: 18,
  },
  {
    slug: 'iphone-15',
    name: 'iPhone 15',
    kind: 'iphone',
    tagline: 'Dynamic Island ready',
    tone: 'gold',
    count: 12,
  },
  {
    slug: 'iphone-14',
    name: 'iPhone 14',
    kind: 'iphone',
    tagline: 'Everyday essentials',
    tone: 'ivory',
    count: 9,
  },
  {
    slug: 'iphone-13',
    name: 'iPhone 13',
    kind: 'iphone',
    tagline: 'Timeless protection',
    tone: 'navy',
    count: 7,
  },
  {
    slug: 'samsung',
    name: 'Samsung',
    kind: 'samsung',
    tagline: 'Galaxy S & A series',
    tone: 'gold',
    count: 11,
  },
  {
    slug: 'oneplus',
    name: 'OnePlus',
    kind: 'oneplus',
    tagline: 'Never settle covers',
    tone: 'ivory',
    count: 5,
  },
  {
    slug: 'tempered-glass',
    name: 'Tempered Glass',
    kind: 'glass',
    tagline: 'Edge-to-edge clarity',
    tone: 'navy',
    count: 8,
  },
  {
    slug: 'power-bank',
    name: 'Power Banks',
    kind: 'battery',
    tagline: 'Carry the charge',
    tone: 'gold',
    count: 4,
  },
  {
    slug: 'camera-rings',
    name: 'Camera Rings',
    kind: 'camera',
    tagline: 'Guard every lens',
    tone: 'ivory',
    count: 3,
  },
  {
    slug: 'fashion',
    name: 'Fashion Accessories',
    kind: 'fashion',
    tagline: 'Statement carry',
    tone: 'navy',
    count: 9,
  },
]

// Grid view used on the Home and Categories pages: the individual iPhone
// models are collapsed into one "iPhone" tile that opens the model picker
// at /iphone — mirroring the single Samsung tile.
export const browseCategories = [
  {
    slug: 'iphone',
    name: 'iPhone',
    kind: 'iphone',
    tagline: 'iPhone 16 · 15 · 14 · 13',
    tone: 'navy',
    count: categories
      .filter((c) => c.kind === 'iphone')
      .reduce((n, c) => n + c.count, 0),
    to: '/iphone',
  },
  ...categories.filter((c) => c.kind !== 'iphone'),
]

export const categoryMap = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
)

export const categoryLabel = (slug) => categoryMap[slug]?.name ?? slug
