export interface ColorVariant {
  name: string;
  hex: string;
  secondaryHex?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  date: string;
  colour: string;
  verified: boolean;
  body: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  asin: string;
  brand: string;
  title: string;
  image: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviewCount: number;
  ratingBreakdown: [number, number, number, number, number]; // 5-star down to 1-star %
  boughtPastMonth?: string;
  isPrime: boolean;
  isTomorrowDelivery: boolean;
  isFreeDelivery: boolean;
  deliveryDateText: string;
  deliverySubtext?: string;
  shippingOrigin: 'Singapore' | 'Amazon US' | 'Amazon Japan';
  soldBy: string;
  badge?: 'Best Seller' | "Amazon's Choice" | 'Limited time deal';
  badgeCategory?: string;
  isSponsored?: boolean;
  voucher?: {
    label: string;
    type: 'percent' | 'fixed';
    value: number;
  };
  department:
    | 'Rugged Hinge Cases'
    | 'Ultra-Thin & Aramid'
    | 'Clear & MagSafe'
    | 'Kickstand Cases'
    | 'Flip & Wallet Folios';
  features: Array<
    | 'MagSafe Compatible'
    | 'Hinge Protection'
    | 'Built-in Kickstand'
    | 'Ultra-Thin (< 1mm)'
    | 'Anti-Yellowing Clear'
  >;
  colours: ColorVariant[];
  extraColoursCount?: number;
  stockStatus: string;
  aboutBullets: string[];
  specs: Record<string, string>;
  reviews: ProductReview[];
  releaseTimestamp: number;
}

export interface CartItem {
  productId: string;
  colour: string;
  quantity: number;
  voucherApplied: boolean;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'newest'
  | 'bestsellers';

export interface FilterState {
  searchQuery: string;
  searchDepartment: string;
  primeOnly: boolean;
  tomorrowOnly: boolean;
  freeDeliveryOnly: boolean;
  shippingOrigin: 'all' | 'Singapore' | 'International';
  department: string | null;
  minRating: number | null;
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  features: string[];
  dealsOnly: boolean;
  voucherOnly: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  searchQuery: 'iphone duo case',
  searchDepartment: 'All',
  primeOnly: false,
  tomorrowOnly: false,
  freeDeliveryOnly: false,
  shippingOrigin: 'all',
  department: null,
  minRating: null,
  brands: [],
  minPrice: null,
  maxPrice: null,
  features: [],
  dealsOnly: false,
  voucherOnly: false,
};

export const SEARCH_DEPARTMENTS = [
  'All',
  'Electronics',
  'Mobile Phones & Accessories',
  'Computers',
  'Home & Kitchen',
  'Amazon Fresh',
  'Books',
  'Toys & Games',
];

export const SEARCH_SUGGESTIONS = [
  'iphone duo case',
  'iphone duo case magsafe',
  'iphone duo case hinge protection',
  'iphone duo case spigen',
  'iphone duo case clear',
  'iphone duo case aramid fiber',
  'iphone duo case with kickstand',
  'iphone duo leather wallet folio',
];

export const RELATED_SEARCHES = [
  'spigen iphone duo',
  'iphone duo magsafe case',
  'iphone duo aramid fiber',
  'iphone duo clear case',
  'iphone duo hinge protection',
  'iphone duo kickstand case',
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    asin: 'B0F9DUO001',
    brand: 'Spigen',
    title:
      'Spigen Slim Armor Pro MagFit Case Compatible with iPhone Duo (2026) - Semi-Auto Sliding Hinge Protection, SecuLink Frame, Air Cushion Shockproof Cover - Abyss Black',
    image: '/src/assets/images/case_spigen_slim_armor_1795058847984.jpg',
    price: 68.9,
    listPrice: 89.9,
    rating: 4.7,
    reviewCount: 1482,
    ratingBreakdown: [81, 12, 4, 2, 1],
    boughtPastMonth: '800+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    deliverySubtext: 'Order within 4 hrs 22 mins',
    shippingOrigin: 'Singapore',
    soldBy: 'Spigen Official SG',
    badge: 'Best Seller',
    badgeCategory: 'in Foldable Phone Cases',
    isSponsored: false,
    voucher: {
      label: 'Save 10%',
      type: 'percent',
      value: 10,
    },
    department: 'Rugged Hinge Cases',
    features: ['MagSafe Compatible', 'Hinge Protection'],
    colours: [
      { name: 'Abyss Black', hex: '#1E2022' },
      { name: 'Gunmetal Slate', hex: '#4B5056' },
      { name: 'Bronze Titanium', hex: '#7A6B5C' },
      { name: 'Midnight Navy', hex: '#223149' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Patented Semi-Auto Sliding Hinge Technology shields the iPhone Duo titanium spine against impacts and pocket dust while opening effortlessly.',
      'SecuLink steel micro-pins lock the front cover bezel and rear shell together without messy adhesive residue.',
      'Integrated N52 MagFit magnetic ring supports 25W Qi2 / MagSafe fast wireless charging and magnetic wallets.',
      'Multi-layer PC + TPU architecture with extreme impact foam and MIL-STD-810G Air Cushion corners.',
      'Raised 1.4mm perimeter lip protects the outer LTPO display and dual vertical Pro camera lenses.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Polycarbonate, Thermoplastic Polyurethane, Impact Foam',
      'Special Features': 'Semi-Auto Hinge Guard, MagSafe N52, Drop Tested',
      Weight: '48 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r1',
        author: 'Marcus Tan',
        rating: 5,
        title: 'Hinge cover slides smoothly and MagSafe lock is rock solid',
        date: '14 November 2026',
        colour: 'Abyss Black',
        verified: true,
        body: 'Tried three cases for my iPhone Duo before settling on the Slim Armor Pro. The sliding hinge does not creak or trap lint, and it stays firmly attached to my Belkin car mount on the PIE.',
        helpfulCount: 34,
      },
      {
        id: 'r2',
        author: 'Wei Ling C.',
        rating: 4,
        title: 'Solid protection, adds moderate bulk',
        date: '9 November 2026',
        colour: 'Abyss Black',
        verified: true,
        body: 'Definitely heavier than going caseless, but gives total peace of mind for an expensive foldable. Arrived next morning via Prime Singapore.',
        helpfulCount: 12,
      },
    ],
    releaseTimestamp: 20261015,
  },
  {
    id: 'prod-2',
    asin: 'B0F9DUO002',
    brand: 'Apple',
    title:
      'Apple iPhone Duo TechWoven Case with MagSafe - Two-Piece Precision Tailored Shell with Anodised Aluminium Camera Rim and Qi2 Magnetic Alignment - Midnight Slate',
    image: '/src/assets/images/case_apple_techwoven_1795058847648.jpg',
    price: 89.0,
    rating: 4.5,
    reviewCount: 643,
    ratingBreakdown: [74, 15, 6, 3, 2],
    boughtPastMonth: '500+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    deliverySubtext: 'FREE One-Day Delivery with Prime',
    shippingOrigin: 'Singapore',
    soldBy: 'Amazon.sg',
    badge: "Amazon's Choice",
    badgeCategory: 'for "iphone duo case"',
    department: 'Ultra-Thin & Aramid',
    features: ['MagSafe Compatible', 'Ultra-Thin (< 1mm)'],
    colours: [
      { name: 'Midnight Slate', hex: '#243554' },
      { name: 'Storm Charcoal', hex: '#37393E' },
      { name: 'Cypress Green', hex: '#394D45' },
      { name: 'Mulberry', hex: '#5A3443' },
      { name: 'Taupe Stone', hex: '#9A9185' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Engineered specifically by Apple for iPhone Duo with dual micro-suction panels that preserve the ultra-slim 8.9mm folded profile.',
      'Next-generation durable TechWoven twill fabric resists scuffs, moisture, and edge fraying better than previous generations.',
      'Built-in MagSafe and Qi2 magnet array automatically aligns chargers and snaps securely onto magnetic accessories.',
      'Soft microfibre interior lining cushions both exterior titanium plates against micro-abrasions.',
      'Machined anodised aluminium camera ring and tactile metallic Action and Volume buttons.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'TechWoven Recycled Microtwill, Anodised Aluminium',
      'Special Features': 'Official Apple Fit, MagSafe & Qi2 Ready',
      Weight: '26 g',
      'Country of Fulfillment': 'Amazon.sg Fulfilment Centre',
    },
    reviews: [
      {
        id: 'r3',
        author: 'Darren Lim',
        rating: 5,
        title: 'Best fit and finish by far — feels almost naked',
        date: '16 November 2026',
        colour: 'Midnight Slate',
        verified: true,
        body: 'The buttons are super clicky and the new woven textile actually resists stains well. Leaves the titanium hinge exposed so the phone slips into suit pockets effortlessly.',
        helpfulCount: 27,
      },
      {
        id: 'r4',
        author: 'Siti N.',
        rating: 4,
        title: 'Gorgeous colour, wish it covered the hinge',
        date: '11 November 2026',
        colour: 'Midnight Slate',
        verified: true,
        body: 'Love the deep slate blue shade and zero added bulk. Just note this is for scratch protection and grip rather than heavy drops.',
        helpfulCount: 9,
      },
    ],
    releaseTimestamp: 20261028,
  },
  {
    id: 'prod-3',
    asin: 'B0F9DUO003',
    brand: 'Thinborne',
    title:
      'Thinborne Super Thin iPhone Duo Case - 600D Aerospace Aramid Fiber Minimalist Carbon Weave Shell with Built-in MagSafe N52 Magnets (0.9mm Ultra-Slim, 21g)',
    image: '/src/assets/images/case_thinborne_aramid_1795058847625.jpg',
    price: 88.0,
    listPrice: 109.0,
    rating: 4.6,
    reviewCount: 389,
    ratingBreakdown: [79, 13, 4, 2, 2],
    boughtPastMonth: '300+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: false,
    isFreeDelivery: true,
    deliveryDateText: 'Thu, 26 Nov',
    deliverySubtext: 'Ships from Amazon US · Free with Prime',
    shippingOrigin: 'Amazon US',
    soldBy: 'Thinborne Official US',
    isSponsored: true,
    department: 'Ultra-Thin & Aramid',
    features: ['MagSafe Compatible', 'Ultra-Thin (< 1mm)'],
    colours: [
      { name: '600D Carbon Twill', hex: '#1C1D1F' },
      { name: 'Stealth Forged', hex: '#2E3136' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Crafted from genuine 600D aerospace-grade aramid fiber — 5x stronger than steel at a fraction of the weight (only 21.5 grams).',
      'Ultra-thin 0.90mm wall thickness preserves the native ergonomics of the iPhone Duo with exposed titanium hinge access.',
      'Embedded ultra-thin N52 magnetic array works seamlessly with Apple MagSafe chargers, stands, and Qi2 battery packs.',
      'Silky matte 3D grip coating delivers confident one-handed grip without attracting oil smudges or pocket lint.',
      'Includes bonus 9H tempered glass outer cover screen protector and precision alignment frame in the box.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: '600D Aerospace Aramid Fiber',
      Thickness: '0.90 mm',
      Weight: '21.5 g',
      'Country of Fulfillment': 'Amazon International Store (US)',
    },
    reviews: [
      {
        id: 'r5',
        author: 'Kenneth Ng',
        rating: 5,
        title: 'True naked-phone feel with killer carbon grip',
        date: '13 November 2026',
        colour: '600D Carbon Twill',
        verified: true,
        body: 'Worth the short wait from Amazon US. The 600D weave feels silky yet grippy, and the included outer screen protector lines up seamlessly with the front frame.',
        helpfulCount: 19,
      },
    ],
    releaseTimestamp: 20261012,
  },
  {
    id: 'prod-4',
    asin: 'B0F9DUO004',
    brand: 'Spigen',
    title:
      'Spigen Ultra Hybrid Pro MagFit Case for iPhone Duo - Crystal Clear Anti-Yellowing DuraClear Back with Transparent Hinge Guard & MagSafe Ring - Zero One Crystal',
    image: '/src/assets/images/case_spigen_ultra_hybrid_1795058847577.jpg',
    price: 44.9,
    listPrice: 54.9,
    rating: 4.5,
    reviewCount: 924,
    ratingBreakdown: [72, 16, 7, 3, 2],
    boughtPastMonth: '600+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    deliverySubtext: 'Order within 4 hrs 22 mins',
    shippingOrigin: 'Singapore',
    soldBy: 'Spigen Official SG',
    badge: 'Limited time deal',
    department: 'Clear & MagSafe',
    features: ['MagSafe Compatible', 'Hinge Protection', 'Anti-Yellowing Clear'],
    colours: [
      { name: 'Crystal Clear', hex: '#E5E7EB' },
      { name: 'Frost Graphite', hex: '#5C6168' },
      { name: 'Space Crystal', hex: '#9CA3AF' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Blue-resin infused DuraClear polycarbonate resists UV yellowing so your iPhone Duo titanium finish stays on full display.',
      'Integrated transparent spring-action hinge shield guards the folding spine without hiding the device aesthetics.',
      'Strong integrated white MagFit ring provides crisp magnetic snap for MagSafe chargers and stands.',
      'Micro-dot inner texture prevents wet-look rainbow watermarks on the rear glass.',
      'Raised edges keep both the outer display and camera module clear of flat surfaces.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Blue-Resin Polycarbonate + Shock-Absorbing TPU',
      'Special Features': 'Anti-Yellowing, Transparent Hinge Guard, MagSafe',
      Weight: '38 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r6',
        author: 'Rachel Goh',
        rating: 5,
        title: 'Shows off the silver titanium finish beautifully',
        date: '15 November 2026',
        colour: 'Crystal Clear',
        verified: true,
        body: 'Zero watermarks on the back and the clear hinge guard fits tight with zero wiggle. Great value at S$44.90.',
        helpfulCount: 16,
      },
    ],
    releaseTimestamp: 20261018,
  },
  {
    id: 'prod-5',
    asin: 'B0F9DUO005',
    brand: 'TORRAS',
    title:
      'TORRAS Magnetic Ostand R Case for iPhone Duo - 360° Rotatable Aerospace Aluminium Ring Kickstand, Translucent Matte Shockproof Cover with 18N MagSafe Lock - Smoky Black',
    image: '/src/assets/images/case_torras_ostand_1795058848425.jpg',
    price: 58.9,
    listPrice: 72.9,
    rating: 4.8,
    reviewCount: 512,
    ratingBreakdown: [86, 9, 3, 1, 1],
    boughtPastMonth: '400+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    shippingOrigin: 'Singapore',
    soldBy: 'TORRAS Official Singapore',
    voucher: {
      label: 'Save S$5.00',
      type: 'fixed',
      value: 5,
    },
    department: 'Kickstand Cases',
    features: ['MagSafe Compatible', 'Built-in Kickstand'],
    colours: [
      { name: 'Smoky Black', hex: '#3B3E42' },
      { name: 'Titanium Grey', hex: '#868A90' },
      { name: 'Deep Navy', hex: '#263859' },
      { name: 'Clear Frost', hex: '#D8DDE3' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Flush-folding 360° aerospace-grade aluminium O-ring stand props the iPhone Duo stably both folded and unfolded in portrait or landscape.',
      'Halbach 18N magnetic array delivers 40% stronger MagSafe attachment force while keeping the stand completely flat when closed.',
      'Tested for over 30,000 open/close hinge cycles on the ring stand with smooth damped tension at any angle from 15° to 120°.',
      'Velvety frosted translucent matte back repels fingerprints and pairs with X-Shock 4.0 corner air pockets.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Matte Polycarbonate, Aerospace Aluminium Stand',
      'Special Features': '360° Rotatable Ring Stand, 18N MagSafe',
      Weight: '44 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r7',
        author: 'Alvin Koh',
        rating: 5,
        title: 'Best kickstand for watching Netflix unfolded on MRT/flights',
        date: '17 November 2026',
        colour: 'Smoky Black',
        verified: true,
        body: 'The O-ring stays completely flush when closed and holds the heavy unfolded iPhone Duo rock steady at 60 degrees. Easily my favourite accessory so far.',
        helpfulCount: 41,
      },
    ],
    releaseTimestamp: 20261025,
  },
  {
    id: 'prod-6',
    asin: 'B0F9DUO006',
    brand: 'ESR',
    title:
      'ESR Classic Hybrid Case for iPhone Duo with Stash Stand - Camera-Frame Zinc Alloy Kickstand, HaloLock MagSafe Ring, Military-Grade Protection - Frosted Desert Titanium',
    image: '/src/assets/images/case_esr_classic_stand_1795058848341.jpg',
    price: 36.9,
    listPrice: 46.9,
    rating: 4.6,
    reviewCount: 785,
    ratingBreakdown: [77, 14, 5, 2, 2],
    boughtPastMonth: '500+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    shippingOrigin: 'Singapore',
    soldBy: 'ESR Official Store SG',
    badge: 'Limited time deal',
    department: 'Kickstand Cases',
    features: ['MagSafe Compatible', 'Built-in Kickstand'],
    colours: [
      { name: 'Desert Titanium', hex: '#B7AA96' },
      { name: 'Clear', hex: '#E5E7EB' },
      { name: 'Frosted Black', hex: '#2D3035' },
      { name: 'Natural Titanium', hex: '#9A9892' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Patented Stash Stand hides seamlessly around the camera guard so the MagSafe ring remains 100% unobstructed for wireless charging.',
      'Zinc-alloy kickstand adjusts smoothly between 15° and 85° for hands-free FaceTime calls and unfolded tablet viewing.',
      '1,500 g holding force HaloLock magnets snap securely onto MagSafe power banks, car chargers, and desk stands.',
      'SGS-certified Air Guard shock-absorbing corners engineered for drops up to 3.3 metres.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Acrylic Back, TPU Frame, Zinc Alloy Kickstand',
      'Special Features': 'Camera-Guard Stash Stand, HaloLock MagSafe',
      Weight: '41 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r8',
        author: 'Jasmine Teo',
        rating: 5,
        title: 'Clever camera stand keeps MagSafe completely free',
        date: '10 November 2026',
        colour: 'Desert Titanium',
        verified: true,
        body: 'Matches the Desert Titanium iPhone Duo perfectly. Having the kickstand on the camera frame means I can charge via MagSafe while propped up on my desk.',
        helpfulCount: 22,
      },
    ],
    releaseTimestamp: 20261020,
  },
  {
    id: 'prod-7',
    asin: 'B0F9DUO007',
    brand: 'PITAKA',
    title:
      'PITAKA Ultra-Slim Tactile Woven Case for iPhone Duo - Fusion Weaving 1500D Aramid Fiber, Amber Magnet Film MagSafe Slim Cover (0.95mm) - Sunset',
    image: '/src/assets/images/case_pitaka_sunset_aramid_1795058847927.jpg',
    price: 94.5,
    rating: 4.8,
    reviewCount: 274,
    ratingBreakdown: [87, 9, 2, 1, 1],
    boughtPastMonth: '200+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: false,
    isFreeDelivery: true,
    deliveryDateText: 'Fri, 20 Nov',
    deliverySubtext: 'FREE Delivery by Amazon',
    shippingOrigin: 'Singapore',
    soldBy: 'PITAKA Official SG',
    department: 'Ultra-Thin & Aramid',
    features: ['MagSafe Compatible', 'Ultra-Thin (< 1mm)'],
    colours: [
      { name: 'Sunset', hex: '#C66634', secondaryHex: '#25314B' },
      { name: 'Moonrise', hex: '#283A63', secondaryHex: '#577399' },
      { name: 'Black/Grey Twill', hex: '#242529' },
      { name: 'Forest Green', hex: '#2D4A3E' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Signature Fusion Weaving craftsmanship intertwines vibrant sunset aramid threads into a seamless, fade-proof tactile texture.',
      'Amber Magnet Film technology integrates ultra-thin MagSafe magnets directly under the weave with zero visible bulge.',
      'Weighs just 22 grams and measures 0.95mm thin to honour the featherweight design of the iPhone Duo.',
      'Precision-chamfered edges provide silky comfort when swiping across the outer and inner displays.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: '1500D Aerospace Aramid Fiber',
      Thickness: '0.95 mm',
      Weight: '22 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r9',
        author: 'Nicholas Yeo',
        rating: 5,
        title: 'Stunning weave in person, feels like luxury watch strap texture',
        date: '15 November 2026',
        colour: 'Sunset',
        verified: true,
        body: 'Expensive, yes, but the Sunset woven pattern looks extraordinary on the iPhone Duo. Zero bulk and MagSafe grip is surprisingly strong.',
        helpfulCount: 15,
      },
    ],
    releaseTimestamp: 20261102,
  },
  {
    id: 'prod-8',
    asin: 'B0F9DUO008',
    brand: 'CASEKOO',
    title:
      'CASEKOO Full-Grain Leather Wallet Folio Case for iPhone Duo - RFID Blocking 3-Card Slot Flip Cover with Full Leather Spine Hinge Wrap & Magnetic Clasp - Saddle Brown',
    image: '/src/assets/images/case_wallet_leather_folio_1795058847046.jpg',
    price: 48.0,
    listPrice: 59.9,
    rating: 4.4,
    reviewCount: 318,
    ratingBreakdown: [68, 17, 8, 4, 3],
    boughtPastMonth: '100+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    shippingOrigin: 'Singapore',
    soldBy: 'CASEKOO Official Store',
    voucher: {
      label: 'Save 15%',
      type: 'percent',
      value: 15,
    },
    department: 'Flip & Wallet Folios',
    features: ['Hinge Protection', 'Built-in Kickstand'],
    colours: [
      { name: 'Saddle Brown', hex: '#9A5B32' },
      { name: 'Espresso Black', hex: '#24201E' },
      { name: 'Oxford Navy', hex: '#233247' },
      { name: 'Burgundy Wine', hex: '#632631' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Hand-finished pebbled top-grain cowhide leather ages gracefully into a rich patina while completely enclosing the iPhone Duo spine hinge.',
      'Integrated RFID-blocking lining safeguards up to 3 contactless MRT / EZ-Link / credit cards and folded notes.',
      'Secure low-profile magnetic clasp keeps the folio shut in pockets and converts into a stable horizontal viewing stand.',
      'Shock-absorbing TPU inner cradle securely grips the foldable frame without scratching titanium rails.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Full-Grain Pebbled Leather + Soft Microfibre',
      'Special Features': '3 RFID Card Slots, Full Hinge Wrap, Stand Mode',
      Weight: '68 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r10',
        author: 'David Ong',
        rating: 4,
        title: 'Classic executive look and holds my office pass & credit cards',
        date: '8 November 2026',
        colour: 'Saddle Brown',
        verified: true,
        body: 'Smells like genuine leather and the magnetic clasp stays shut neatly. Note that wireless charging works best when the front flap is folded open.',
        helpfulCount: 11,
      },
    ],
    releaseTimestamp: 20261005,
  },
  {
    id: 'prod-9',
    asin: 'B0F9DUO009',
    brand: 'Spigen',
    title:
      'Spigen Nano Pop MagFit Silicone Case for iPhone Duo - Dual-Tone Matte Grip Cover with Contrast Camera Bumper & Protective Hinge Spine - Blueberry Navy',
    image: '/src/assets/images/case_spigen_nano_pop_1795058848749.jpg',
    price: 45.9,
    rating: 4.6,
    reviewCount: 416,
    ratingBreakdown: [78, 13, 5, 2, 2],
    boughtPastMonth: '300+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    shippingOrigin: 'Singapore',
    soldBy: 'Spigen Official SG',
    isSponsored: true,
    department: 'Rugged Hinge Cases',
    features: ['MagSafe Compatible', 'Hinge Protection'],
    colours: [
      { name: 'Blueberry Navy', hex: '#25395C', secondaryHex: '#E9B949' },
      { name: 'Black Sesame', hex: '#282A2E', secondaryHex: '#8E9299' },
      { name: 'Burgundy Bean', hex: '#5E2B37', secondaryHex: '#E0B4A4' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Bold two-tone sporty colourway combines dust-resistant matte silicone feel with high-contrast raised camera bezel and hinge spine.',
      'Textured side grip pattern reduces accidental drops when unfolding the iPhone Duo one-handed.',
      'Interior suede-like protective pattern and Air Cushion corners absorb daily knocks and drops.',
      'Hidden internal MagFit magnets deliver full MagSafe and Qi2 wireless charging support.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Silicone-Feel TPU + Rigid PC Back',
      'Special Features': 'Two-Tone Design, Dust-Free Coating, Hinge Guard',
      Weight: '42 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r11',
        author: 'Cheryl Chua',
        rating: 5,
        title: 'Love the blueberry & mustard pop — does not stick to pockets!',
        date: '14 November 2026',
        colour: 'Blueberry Navy',
        verified: true,
        body: 'Unlike Apple silicone cases that pick up lint, Nano Pop slides smoothly into jeans while still feeling super grippy in hand.',
        helpfulCount: 18,
      },
    ],
    releaseTimestamp: 20261022,
  },
  {
    id: 'prod-10',
    asin: 'B0F9DUO010',
    brand: 'UAG',
    title:
      'URBAN ARMOR GEAR (UAG) Monarch Pro Hinge Case for iPhone Duo - 5-Layer Tactical Rugged Armor with Reinforced Ribbed Spine Shield & MagSafe - Olive Titanium / Gunmetal',
    image: '/src/assets/images/case_uag_rugged_armor_1795058848135.jpg',
    price: 98.9,
    listPrice: 119.0,
    rating: 4.7,
    reviewCount: 229,
    ratingBreakdown: [82, 11, 4, 2, 1],
    boughtPastMonth: '100+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: false,
    isFreeDelivery: true,
    deliveryDateText: 'Fri, 27 Nov',
    deliverySubtext: 'Ships from Amazon US · Free with Prime',
    shippingOrigin: 'Amazon US',
    soldBy: 'UAG Official US',
    department: 'Rugged Hinge Cases',
    features: ['MagSafe Compatible', 'Hinge Protection'],
    colours: [
      { name: 'Olive Titanium', hex: '#4B5041', secondaryHex: '#35383D' },
      { name: 'Kevlar Black', hex: '#1F2124' },
      { name: 'Crimson Carbon', hex: '#8B262B' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Extreme 20-foot (6m) drop-tested rugged 5-layer construction built for outdoor, construction, and heavy travel use.',
      'Heavy-duty ribbed mechanical hinge spine completely encases the folding axis against concrete impacts and grit.',
      'Oversized hex-beveled traction bumpers and tactile gloved-friendly side buttons.',
      'Built-in MagSafe magnetic module works through the rugged armor backplate.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Armor Shell, Polycarbonate Shear Plate, Alloy Hardware',
      'Drop Test Standard': '2X MIL-STD 810G 516.6 (6 m)',
      Weight: '64 g',
      'Country of Fulfillment': 'Amazon International Store (US)',
    },
    reviews: [
      {
        id: 'r12',
        author: 'Benjamin Low',
        rating: 5,
        title: 'Built like a tank — survived a drop on concrete stairs',
        date: '6 November 2026',
        colour: 'Olive Titanium',
        verified: true,
        body: 'Dropped my iPhone Duo getting out of a Grab van onto concrete pavers. Not a single scratch on the phone or hinge. Worth every cent.',
        helpfulCount: 29,
      },
    ],
    releaseTimestamp: 20261001,
  },
  {
    id: 'prod-11',
    asin: 'B0F9DUO011',
    brand: 'Ringke',
    title:
      'Ringke Slim Matte Case for iPhone Duo - Ultra-Lightweight Frosted Polycarbonate Two-Piece Snap-On Cover with Anti-Fingerprint Coating & Lanyard Hole - Sage Green',
    image: '/src/assets/images/case_ringke_sage_slim_1795058848083.jpg',
    price: 26.9,
    listPrice: 32.9,
    rating: 4.5,
    reviewCount: 604,
    ratingBreakdown: [71, 17, 7, 3, 2],
    boughtPastMonth: '400+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    deliverySubtext: 'FREE Delivery on S$40 of items shipped by Amazon',
    shippingOrigin: 'Singapore',
    soldBy: 'Ringke Official SG',
    voucher: {
      label: 'Save 5%',
      type: 'percent',
      value: 5,
    },
    department: 'Ultra-Thin & Aramid',
    features: ['Ultra-Thin (< 1mm)'],
    colours: [
      { name: 'Sage Green', hex: '#8FA08E' },
      { name: 'Matte Clear', hex: '#E4E7EB' },
      { name: 'Matte Black', hex: '#232528' },
      { name: 'Lavender Mist', hex: '#B9B1C9' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Featherlight 1.1mm rigid polycarbonate shell adds crisp scratch protection with virtually zero added thickness.',
      'Silky frosted matte surface resists oils, fingerprints, and daily yellowing.',
      'Integrated non-slip micro-pads inside the front bezel prevent shifting without leaving permanent glue residue.',
      'Built-in side Duo-QuikCatch lanyard holes let you attach wrist straps or crossbody charms.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Frosted Hard Polycarbonate',
      'Special Features': 'Ultra-Slim, Lanyard Ready, Anti-Fingerprint',
      Weight: '19 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r13',
        author: 'Mei Fen L.',
        rating: 5,
        title: 'Best budget minimalist case under S$30',
        date: '15 November 2026',
        colour: 'Sage Green',
        verified: true,
        body: 'The sage green shade is calming and classy. Super light in the hand and fits tightly around the cover screen.',
        helpfulCount: 14,
      },
    ],
    releaseTimestamp: 20261019,
  },
  {
    id: 'prod-12',
    asin: 'B0F9DUO012',
    brand: 'Incipio',
    title:
      'Incipio Duo Magnetic Dual-Layer Case for iPhone Duo - 12ft Drop Protection with Impact Strut Cushioning, Soft-Touch Antimicrobial Finish & MagSafe - Cobalt Blue',
    image: '/src/assets/images/case_incipio_duo_cobalt_1795058847894.jpg',
    price: 52.0,
    listPrice: 64.9,
    rating: 4.4,
    reviewCount: 451,
    ratingBreakdown: [69, 16, 8, 4, 3],
    boughtPastMonth: '200+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: false,
    isFreeDelivery: true,
    deliveryDateText: 'Fri, 20 Nov',
    shippingOrigin: 'Singapore',
    soldBy: 'Incipio Authorised SG',
    department: 'Rugged Hinge Cases',
    features: ['MagSafe Compatible', 'Hinge Protection'],
    colours: [
      { name: 'Cobalt Blue', hex: '#284C8C' },
      { name: 'Matte Black', hex: '#1F2024' },
      { name: 'Graphite Slate', hex: '#4E535A' },
      { name: 'Terracotta Clay', hex: '#A95742' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Signature two-piece Incipio Duo co-moulded architecture pairs a rigid outer shell with an internal Impact Strut shock bumper.',
      'Drop-tested to 12 feet (3.6m) with raised screen bezel and slim flex-hinge spine shield.',
      'Soft-touch matte exterior made with recycled polycarbonate and antimicrobial surface treatment.',
      'Recessed dual-magnet MagSafe ring snaps securely onto wireless charging pads and car mounts.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Recycled Polycarbonate + Shock-Absorbing Elastomer',
      'Special Features': 'Dual-Layer Impact Struts, 12ft Drop Tested, MagSafe',
      Weight: '45 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r14',
        author: 'Ryan Pillai',
        rating: 4,
        title: 'Love the cobalt blue contrast with dark charcoal edges',
        date: '12 November 2026',
        colour: 'Cobalt Blue',
        verified: true,
        body: 'The dual-layer grip feels very reassuring without looking overly tactical. MagSafe ring locks cleanly.',
        helpfulCount: 8,
      },
    ],
    releaseTimestamp: 20261008,
  },
  // Page 2 listings (4 additional distinct items for genuine multi-page pagination & richer filtering)
  {
    id: 'prod-13',
    asin: 'B0F9DUO013',
    brand: 'ESR',
    title:
      'ESR Clear Zero Series Slim Case for iPhone Duo (2-Pack Value Bundle: Crystal Clear + Frosted Smoke) - Anti-Yellowing MagSafe Compatible Protective Cover',
    image: '/src/assets/images/case_spigen_ultra_hybrid_1795058847577.jpg',
    price: 31.9,
    listPrice: 42.9,
    rating: 4.3,
    reviewCount: 284,
    ratingBreakdown: [66, 18, 9, 4, 3],
    boughtPastMonth: '150+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: true,
    isFreeDelivery: true,
    deliveryDateText: 'Tomorrow, 19 Nov',
    shippingOrigin: 'Singapore',
    soldBy: 'ESR Official Store SG',
    badge: 'Limited time deal',
    department: 'Clear & MagSafe',
    features: ['MagSafe Compatible', 'Anti-Yellowing Clear'],
    colours: [
      { name: 'Clear + Smoke 2-Pack', hex: '#D6DBE0' },
      { name: 'Crystal Clear 2-Pack', hex: '#F0F2F5' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Value 2-pack gives you both Crystal Clear and Frosted Smoke minimalist shells for your iPhone Duo.',
      'High-clarity anti-yellowing polymer stays transparent longer in humid tropical weather.',
      'Embedded MagSafe alignment magnets support fast 25W wireless charging.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Optical Grade Clear Polymer',
      'Package Contents': '2 × iPhone Duo Cases',
      Weight: '32 g (each)',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r15',
        author: 'Sonia Tan',
        rating: 4,
        title: 'Great value for two cases',
        date: '4 November 2026',
        colour: 'Clear + Smoke 2-Pack',
        verified: true,
        body: 'Handy to have a spare clear case ready. Fits nicely and charges on MagSafe smoothly.',
        helpfulCount: 6,
      },
    ],
    releaseTimestamp: 20260928,
  },
  {
    id: 'prod-14',
    asin: 'B0F9DUO014',
    brand: 'TORRAS',
    title:
      'TORRAS Armor Air Spin Case for iPhone Duo - Detachable Hinge Armour + 360° Magnetic Kickstand Ring with Built-In 9H Tempered Glass Front Shield - Titanium Slate',
    image: '/src/assets/images/case_torras_ostand_1795058848425.jpg',
    price: 74.9,
    listPrice: 89.9,
    rating: 4.7,
    reviewCount: 193,
    ratingBreakdown: [83, 11, 4, 1, 1],
    boughtPastMonth: '100+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: false,
    isFreeDelivery: true,
    deliveryDateText: 'Sat, 21 Nov',
    shippingOrigin: 'Singapore',
    soldBy: 'TORRAS Official Singapore',
    voucher: {
      label: 'Save S$8.00',
      type: 'fixed',
      value: 8,
    },
    department: 'Kickstand Cases',
    features: ['MagSafe Compatible', 'Hinge Protection', 'Built-in Kickstand'],
    colours: [
      { name: 'Titanium Slate', hex: '#52565C' },
      { name: 'Matte Obsidian', hex: '#1C1D20' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Modular snap-on hinge shield lets you switch between full spine armor and ultra-slim pocket carry in seconds.',
      'Pre-installed 9H tempered glass cover screen protector keeps the outer display bubble-free and scratch-proof.',
      '360° stainless steel magnetic ring stand works seamlessly with MagSafe mounts and chargers.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Matte PC + Alloy Ring + 9H Tempered Glass',
      'Special Features': 'Detachable Hinge Guard, Front Glass Included',
      Weight: '51 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r16',
        author: 'Hafiz R.',
        rating: 5,
        title: 'Love having both the front glass and kickstand built in',
        date: '12 November 2026',
        colour: 'Titanium Slate',
        verified: true,
        body: 'Touch sensitivity on the built-in outer screen protector is surprisingly responsive.',
        helpfulCount: 9,
      },
    ],
    releaseTimestamp: 20261105,
  },
  {
    id: 'prod-15',
    asin: 'B0F9DUO015',
    brand: 'PITAKA',
    title:
      'PITAKA MagEZ Case 5 for iPhone Duo - Ultra-Light 600D Aramid Fiber Matte Carbon Edition, Zero-Bulk Minimalist Fit with N52 MagSafe - Classic Black Twill',
    image: '/src/assets/images/case_thinborne_aramid_1795058847625.jpg',
    price: 84.9,
    rating: 4.7,
    reviewCount: 342,
    ratingBreakdown: [82, 12, 3, 2, 1],
    boughtPastMonth: '200+ bought in past month',
    isPrime: true,
    isTomorrowDelivery: false,
    isFreeDelivery: true,
    deliveryDateText: 'Thu, 26 Nov',
    deliverySubtext: 'Ships from Amazon Japan · Free with Prime',
    shippingOrigin: 'Amazon Japan',
    soldBy: 'PITAKA Direct JP',
    department: 'Ultra-Thin & Aramid',
    features: ['MagSafe Compatible', 'Ultra-Thin (< 1mm)'],
    colours: [
      { name: 'Classic Black Twill', hex: '#1F2022' },
      { name: 'Rhapsody Twill', hex: '#34415E' },
    ],
    stockStatus: 'Only 6 left in stock.',
    aboutBullets: [
      'Fine 600D aramid fiber delivers a refined silk-matte carbon grain that never interferes with 5G, Wi-Fi 7, or NFC signals.',
      'Only 0.85mm thin and 19.8g light — virtually indistinguishable from holding an uncased iPhone Duo.',
      'Compatible with the entire PITAKA MagEZ ecosystem and official Apple MagSafe accessories.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: '600D Aerospace Aramid Fiber',
      Thickness: '0.85 mm',
      Weight: '19.8 g',
      'Country of Fulfillment': 'Amazon International Store (Japan)',
    },
    reviews: [
      {
        id: 'r17',
        author: 'Kelvin Poh',
        rating: 5,
        title: 'Shipped from Japan in 4 days — immaculate precision',
        date: '11 November 2026',
        colour: 'Classic Black Twill',
        verified: true,
        body: 'Cutouts around the speakers and USB-C port are laser sharp. Best minimalist black case.',
        helpfulCount: 13,
      },
    ],
    releaseTimestamp: 20261010,
  },
  {
    id: 'prod-16',
    asin: 'B0F9DUO016',
    brand: 'Ringke',
    title:
      'Ringke Fusion Matte Hinge Case for iPhone Duo - Frosted Translucent Anti-Smudge Back with Flexible Spine Bumper & Strap Anchor - Frosted Sage',
    image: '/src/assets/images/case_ringke_sage_slim_1795058848083.jpg',
    price: 33.9,
    rating: 4.4,
    reviewCount: 168,
    ratingBreakdown: [68, 19, 8, 3, 2],
    boughtPastMonth: '100+ bought in past month',
    isPrime: false,
    isTomorrowDelivery: false,
    isFreeDelivery: true,
    deliveryDateText: 'Mon, 23 Nov',
    deliverySubtext: 'FREE Delivery on orders over S$40',
    shippingOrigin: 'Singapore',
    soldBy: 'Ringke Official SG',
    department: 'Clear & MagSafe',
    features: ['Hinge Protection', 'Anti-Yellowing Clear'],
    colours: [
      { name: 'Frosted Sage', hex: '#8FA08E' },
      { name: 'Smoke Matte', hex: '#555A60' },
    ],
    stockStatus: 'In Stock',
    aboutBullets: [
      'Frosted translucent polycarbonate back diffuses fingerprints while letting the metallic sheen of iPhone Duo shine through.',
      'Flexible elastomer hinge bumper protects the centre spine without adding bulky mechanical springs.',
      'QuikCatch dual lanyard eyelets support wrist and neck straps for commute convenience.',
    ],
    specs: {
      'Compatible Phone Models': 'iPhone Duo (2026)',
      Material: 'Frosted PC + TPU Hinge Strip',
      'Special Features': 'Anti-Smudge Matte, Slim Hinge Strip',
      Weight: '31 g',
      'Country of Fulfillment': 'Singapore Local Stock',
    },
    reviews: [
      {
        id: 'r18',
        author: 'Grace Ho',
        rating: 4,
        title: 'Slim hinge bumper without bulk',
        date: '7 November 2026',
        colour: 'Frosted Sage',
        verified: true,
        body: 'Nice middle ground between super slim cases and chunky rugged armor.',
        helpfulCount: 5,
      },
    ],
    releaseTimestamp: 20261003,
  },
];

export const ALL_BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
