'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// 1. SEASONAL EVENT SETTINGS (EDIT ONLY THIS BLOCK FOR CHRISTMAS / EASTER)
// =========================================================================
const EVENT_CONFIG = {
  badgeText: 'Live 2026 Black Friday & Cyber Monday Hub',
  heroTitle: 'Verified Rolife, ROKR & Miniature Kit Deals',
  heroSubtitle:
    'Copy working 20%–25% off Rolife promo codes in one tap, filter by brand, and compare direct brand savings against fast Amazon Prime shipping.',
  // Leave '' (empty string) to hide the countdown timer for non-timed events
  countdownTargetIso: '2026-12-01T20:00:00Z',
  countdownLabel: 'Rolife Codes Expire Dec 1 (12 PM PST):',
  primaryCtaLabel: 'Shop Rolife Direct (Up to 50% Off) ↗',
  secondaryCtaLabel: 'Browse All Brands & Amazon Picks ↓',
  gridHeading: 'Shop 2026 Deals by Brand',
  gridSubheading:
    'Rolife direct prices checked Nov 21–22, 2026. Click any Amazon button to view live Black Friday Prime pricing.',
  guideNavLabel: "Buyer's Guide",
  guideHref: '/blog/black-friday-miniatures-craft-kit-deals',
  guideCtaTitle: 'Not sure whether to buy Direct or on Amazon?',
  guideCtaText:
    "Read our complete 2026 Black Friday Miniature Buyer's Guide for fake-deal warnings, beginner recommendations, and tool deals.",
  guideCtaButton: "Read the Buyer's Guide →",
};

// =========================================================================
// 2. MASTER AFFILIATE LINKS (ALL PRODUCT LINKS LIVE)
// =========================================================================
const LINKS = {
  // Swap rolifeStoreHome to your Impact link for
  // https://www.rolifeonline.com/pages/black-friday-sale if you create one
  rolifeStoreHome: 'https://rolife.pxf.io/DWxGvb',
  gumroadSale: 'https://craftsman353.gumroad.com/l/miniature-guide',

  // --- ROLIFE FLASH DEALS & DIRECT-ONLY ---
  streetSceneRolife: 'https://rolife.pxf.io/aNgRzR',       // TGB13
  nightOutStallRolife: 'https://rolife.pxf.io/DWo0M2',     // DW022
  cookiiBunnyRolife: 'https://rolife.pxf.io/5kraB2',       // DG177
  carolingCathedralRolife: 'https://rolife.pxf.io/2RNbNa', // TGB26
  firesideMusicRolife: 'https://rolife.pxf.io/3kQAqM',     // AMS03
  kikisEmporiumRolife: 'https://rolife.pxf.io/DWNDob',     // DG155
  superCreatorRolife: 'https://rolife.pxf.io/yZMgP3',      // Super Creator Hub

  // --- ROLIFE DUAL-CHANNEL (BOTH ROLIFE DIRECT + AMAZON) ---
  teddysToyShopRolife: 'https://rolife.pxf.io/gR0PeA',
  teddysToyShopAmazon: 'https://link.amazon/B0faoFlqC',

  floralPerfumeRolife: 'https://rolife.pxf.io/1GxeM9',
  floralPerfumeAmazon: 'https://link.amazon/B03gfjG5e',

  polarisPostRolife: 'https://rolife.pxf.io/VOX9MM',
  polarisPostAmazon: 'https://link.amazon/B08HIWdZh',

  sakuraDensyaRolife:
    'https://rolife.pxf.io/c/8194936/4112999/56826?prodsku=18055906533414975711883087&u=https%3A%2F%2Fwww.rolifeonline.com%2Fproducts%2Frolife-tgb01-sakura-densya-3d-wooden-diy-miniature-house-book-nook-%3Fcountry%3DUS%26sku%3D18055906533414975711883087&intsrc=APIG_38465',
  sakuraDensyaAmazon: 'https://link.amazon/B0j4JHmk1',

  aFrameCabinRolife:
    'https://rolife.pxf.io/c/8194936/4112999/56826?prodsku=18072488701716531853530975&u=https%3A%2F%2Fwww.rolifeonline.com%2Fproducts%2Frolife-diy-miniature-house-a-frame-cabin-dg181%3Fcountry%3DUS%26sku%3D18072488701716531853530975&intsrc=APIG_38465',
  aFrameCabinAmazon: 'https://link.amazon/B0eg2nbs0',

  samsStudyRolife:
    'https://rolife.pxf.io/c/8194936/4112999/56826?prodsku=18053530683441478185233087&u=https%3A%2F%2Fwww.rolifeonline.com%2Fproducts%2Frolife-sams-study-dg102%3Fcountry%3DUS%26sku%3D18053530683441478185233087&intsrc=APIG_38465',
  samsStudyAmazon: 'https://link.amazon/B0iRW9bU0',

  cathysFlowerRolife:
    'https://rolife.pxf.io/c/8194936/4112999/56826?prodsku=18053530683455571046563087&u=https%3A%2F%2Fwww.rolifeonline.com%2Fproducts%2Frolife-cathys-flower-house-dg104-diy-miniature-dollhouse%3Fcountry%3DUS%26sku%3D18053530683455571046563087&intsrc=APIG_38465',
  cathysFlowerAmazon: 'https://link.amazon/B0hjW9vt7',

  // --- AMAZON-ONLY ROLIFE, ROKR, OTHER BRANDS & TOOLS ---
  simonsCoffeeAmazon: 'https://amzn.to/4rMQa5O',
  holidayBundleAmazon: 'https://link.amazon/B01SxHrDB',
  cuckooClockAmazon: 'https://link.amazon/B0f9pWTo0',
  dinosaurPinballAmazon: 'https://link.amazon/B0cR9y4G5',
  minicityLibraryAmazon: 'https://link.amazon/A0iQrCA6p',
  cutebeeOwlAmazon: 'https://amzn.to/48xUDQW',
  cutebeeEternalAmazon: 'https://amzn.to/3Xw1tBx',
  handsCraftFlowerAmazon: 'https://link.amazon/B088CKQVU',
  handsCraftGardenAmazon: 'https://amzn.to/48neKTf',
  greenleafHarrisonAmazon: 'https://link.amazon/B0cxR9lfU',
  godHandNipperAmazon: 'https://amzn.to/4ieaOsX',
};

// =========================================================================
// 3. ACTIVE PROMO CODES (SWAP FOR CHRISTMAS / EVERGREEN CODES AFTER DEC 1)
// =========================================================================
interface PromoCode {
  id: string;
  brand: string;
  badge: string;
  headline: string;
  details: string;
  code: string;
  ctaLabel: string;
  url: string;
  highlight?: boolean;
}

const PROMO_CODES: PromoCode[] = [
  {
    id: 'bfcm20',
    brand: 'Rolife Official Store',
    badge: 'MOST POPULAR • NO MINIMUM',
    headline: '20% OFF Sitewide',
    details:
      'Works with no minimum spend on eligible Rolife kits through Dec 1 (12:00 PM PST), plus free shipping on orders over $68 USD.',
    code: 'BFCM20',
    ctaLabel: 'Apply at Rolife Store ↗',
    url: LINKS.rolifeStoreHome,
    highlight: true,
  },
  {
    id: 'bfcm25',
    brand: 'Rolife Official Store',
    badge: 'BIGGEST SAVINGS • $120+ ORDERS',
    headline: '25% OFF Orders $120+',
    details:
      'Best for Super Creator multi-kit sets or 3 holiday gifts (e.g., DG188 + DG189 + AMS03 drops from $132.97 to $99.73). One code per order.',
    code: 'BFCM25',
    ctaLabel: 'Shop Super Creator & Sets ↗',
    url: LINKS.superCreatorRolife,
    highlight: true,
  },
];

// =========================================================================
// 4. BRAND-ORGANIZED DEALS CATALOG
// =========================================================================
type Category =
  | 'All'
  | 'Rolife Flash Deals'
  | 'Rolife'
  | 'ROKR'
  | 'Cutebee & MiniCity'
  | 'Hands Craft & Greenleaf'
  | 'Hobby Tools';

interface DealItem {
  id: string;
  brand: string;
  name: string;
  sku: string;
  categories: Exclude<Category, 'All'>[];
  badge: string;
  regularPrice?: string;
  dealPrice: string;
  codeToUse?: string;
  isFlashDeal?: boolean;
  blurb: string;
  reviewSlug?: string;
  rolifeUrl?: string;
  amazonUrl?: string;
}

const FEATURED_DEALS: DealItem[] = [
  // --- ROLIFE FLASH DEALS ---
  {
    id: 'tgb13',
    brand: 'Rolife',
    name: 'Rolife Street Scene Book Nook',
    sku: 'TGB13 • Direct Flash Deal',
    categories: ['Rolife Flash Deals', 'Rolife'],
    badge: '50% OFF FLASH DEAL',
    regularPrice: '$49.99',
    dealPrice: '$25.00',
    isFlashDeal: true,
    blurb: 'Vintage street-alley bookshelf insert at half off direct from Rolife while flash stock lasts.',
    rolifeUrl: LINKS.streetSceneRolife,
  },
  {
    id: 'dw022',
    brand: 'Rolife',
    name: 'Rolife Night Out Food Stall',
    sku: 'DW022 • Super Creator',
    categories: ['Rolife Flash Deals', 'Rolife'],
    badge: '50% OFF FLASH DEAL',
    regularPrice: '$43.99',
    dealPrice: 'From $22.00',
    isFlashDeal: true,
    blurb: 'Snap-together Super Creator late-night food stall. Limited direct flash-deal inventory.',
    rolifeUrl: LINKS.nightOutStallRolife,
  },
  {
    id: 'dg177',
    brand: 'Rolife',
    name: "Rolife Cookii Bunny's Cookie Shop",
    sku: 'DG177 • Direct Flash Deal',
    categories: ['Rolife Flash Deals', 'Rolife'],
    badge: '30% OFF FLASH DEAL',
    regularPrice: '$33.99',
    dealPrice: '$23.79',
    isFlashDeal: true,
    blurb: 'Compact, beginner-friendly miniature bakery room box marked down 30% direct from Rolife.',
    rolifeUrl: LINKS.cookiiBunnyRolife,
  },

  // --- ROLIFE DUAL-CHANNEL & HOLIDAY ---
  {
    id: 'tgb26',
    brand: 'Rolife',
    name: 'Rolife Caroling Cathedral Book Nook',
    sku: 'TGB26 • 503 pcs',
    categories: ['Rolife'],
    badge: '2026 HOLIDAY FLAGSHIP',
    regularPrice: '$58.99',
    dealPrice: '$47.19',
    codeToUse: 'BFCM20',
    blurb: 'Festive Gothic cathedral bookshelf insert with stained-glass accents and warm lighting.',
    rolifeUrl: LINKS.carolingCathedralRolife,
  },
  {
    id: 'dg189',
    brand: 'Rolife',
    name: "Rolife Teddy's Toy Shop",
    sku: 'DG189 • 335 pcs • Type-C',
    categories: ['Rolife'],
    badge: 'UNDER $40 DIRECT',
    regularPrice: '$49.99',
    dealPrice: '$39.99',
    codeToUse: 'BFCM20',
    blurb: 'European-style vintage toy shop (~6-hour build) with Type-C lighting. Available direct or via Amazon.',
    rolifeUrl: LINKS.teddysToyShopRolife,
    amazonUrl: LINKS.teddysToyShopAmazon,
  },
  {
    id: 'dg188',
    brand: 'Rolife',
    name: 'Rolife Floral Perfume Shop',
    sku: 'DG188 • 347 pcs • Type-C',
    categories: ['Rolife'],
    badge: 'UNDER $40 DIRECT',
    regularPrice: '$49.99',
    dealPrice: '$39.99',
    codeToUse: 'BFCM20',
    blurb: 'Parisian fragrance boutique (~6-hour build) with glowing display shelves. Direct or Amazon.',
    rolifeUrl: LINKS.floralPerfumeRolife,
    amazonUrl: LINKS.floralPerfumeAmazon,
  },
  {
    id: 'dg187',
    brand: 'Rolife',
    name: 'Rolife Polaris Post Miniature House',
    sku: 'DG187 • Holiday Pick',
    categories: ['Rolife'],
    badge: 'HANDS-ON TESTED',
    dealPrice: '20% Off Direct',
    codeToUse: 'BFCM20',
    blurb: 'Festive North Pole post office miniature build—compare Rolife direct savings vs. Amazon Prime.',
    reviewSlug: '/blog/rolife-polaris-post-dg187-review',
    rolifeUrl: LINKS.polarisPostRolife,
    amazonUrl: LINKS.polarisPostAmazon,
  },
  {
    id: 'tgb01',
    brand: 'Rolife',
    name: 'Rolife Sakura Densya Book Nook',
    sku: 'TGB01 • Bestseller',
    categories: ['Rolife'],
    badge: 'READER FAVORITE',
    regularPrice: '$49.99',
    dealPrice: '$39.99',
    codeToUse: 'BFCM20',
    blurb: 'Iconic Tokyo cherry-blossom tram book nook with touch-switch warm LED lighting.',
    reviewSlug: '/blog/robotime-sakura-densya-review',
    rolifeUrl: LINKS.sakuraDensyaRolife,
    amazonUrl: LINKS.sakuraDensyaAmazon,
  },
  {
    id: 'dg181',
    brand: 'Rolife',
    name: 'Rolife A-Frame Cabin',
    sku: 'DG181 • Snap-Fit Build',
    categories: ['Rolife'],
    badge: 'BEGINNER FRIENDLY',
    dealPrice: '20% Off Direct',
    codeToUse: 'BFCM20',
    blurb: 'Cozy woodland cabin designed for fast, clean snap-fit assembly with minimal mess.',
    rolifeUrl: LINKS.aFrameCabinRolife,
    amazonUrl: LINKS.aFrameCabinAmazon,
  },
  {
    id: 'dg102',
    brand: 'Rolife',
    name: "Rolife Sam's Study Miniature Library",
    sku: 'DG102 • Classic',
    categories: ['Rolife'],
    badge: 'TOP CLASSIC PICK',
    dealPrice: '20% Off Direct',
    codeToUse: 'BFCM20',
    blurb: 'Famous miniature study packed with hundreds of tiny paper books for patient crafters.',
    rolifeUrl: LINKS.samsStudyRolife,
    amazonUrl: LINKS.samsStudyAmazon,
  },
  {
    id: 'dg104',
    brand: 'Rolife',
    name: "Rolife Cathy's Flower House",
    sku: 'DG104 • Greenhouse',
    categories: ['Rolife'],
    badge: 'BEST DISPLAY KIT',
    dealPrice: '20% Off Direct',
    codeToUse: 'BFCM20',
    blurb: 'Clear greenhouse packed with miniature plants, bouquets, and gardening tools.',
    rolifeUrl: LINKS.cathysFlowerRolife,
    amazonUrl: LINKS.cathysFlowerAmazon,
  },
  {
    id: 'ams03',
    brand: 'Rolife',
    name: 'Rolife Fireside Music Night',
    sku: 'AMS03 • DIY Music Box',
    categories: ['Rolife'],
    badge: 'UNDER $30 GIFT',
    regularPrice: '$32.99',
    dealPrice: '$26.39',
    codeToUse: 'BFCM20',
    blurb: 'Cozy holiday fireplace diorama paired with a wind-up music box—easy add-on to cross $120.',
    rolifeUrl: LINKS.firesideMusicRolife,
  },
  {
    id: 'dg155',
    brand: 'Rolife',
    name: "Rolife Kiki's Magic Emporium",
    sku: 'DG155 • Classic',
    categories: ['Rolife'],
    badge: 'FAN FAVORITE',
    dealPrice: '20% Off Direct',
    codeToUse: 'BFCM20',
    blurb: 'Whimsical witchy shop filled with glowing potion bottles, broomsticks, and spellbooks.',
    rolifeUrl: LINKS.kikisEmporiumRolife,
  },
  {
    id: 'super-creator',
    brand: 'Rolife',
    name: 'Rolife Super Creator Multi-Kit Sets',
    sku: 'Stackable Snap-Fit Rooms',
    categories: ['Rolife'],
    badge: 'BEST FOR BFCM25 ($120+)',
    dealPrice: 'Up to 25% Off',
    codeToUse: 'BFCM25',
    blurb: 'Combine 3–4 stackable Super Creator rooms past $120 to unlock 25% off direct from Rolife.',
    rolifeUrl: LINKS.superCreatorRolife,
  },
  {
    id: 'dg109',
    brand: 'Rolife',
    name: "Rolife Simon's Coffee",
    sku: 'DG109 • Amazon Pick',
    categories: ['Rolife'],
    badge: 'AMAZON PRIME PICK',
    dealPrice: 'Check Amazon',
    blurb: 'Warm café room box with miniature espresso machines, pastries, and framed wall art.',
    amazonUrl: LINKS.simonsCoffeeAmazon,
  },
  {
    id: 'bundle-xmas',
    brand: 'Rolife',
    name: 'Reindeer Express + Polaris Post Bundle',
    sku: 'DS059 + DG187 • 2-Kit Set',
    categories: ['Rolife'],
    badge: 'HOLIDAY BUNDLE',
    dealPrice: 'Check Amazon',
    blurb: 'Two festive Rolife holiday builds bundled together for weekend Christmas crafting.',
    reviewSlug: '/blog/rolife-polaris-post-dg187-review',
    amazonUrl: LINKS.holidayBundleAmazon,
  },

  // --- ROKR MECHANICAL (AMAZON) ---
  {
    id: 'lcb01',
    brand: 'ROKR',
    name: 'ROKR Christmas Cuckoo Clock',
    sku: 'LCB01 • 293 pcs',
    categories: ['ROKR'],
    badge: 'HANDS-ON TESTED',
    dealPrice: 'Check Amazon',
    blurb: 'Working quartz clock with hourly cuckoo bird, gliding Santa sleigh, music & warm LEDs.',
    reviewSlug: '/blog/rokr-christmas-cuckoo-clock-lcb01-review',
    amazonUrl: LINKS.cuckooClockAmazon,
  },
  {
    id: 'mgp01',
    brand: 'ROKR',
    name: 'ROKR Dinosaur Lab Pinball',
    sku: 'MGP01 • Mechanical',
    categories: ['ROKR'],
    badge: 'ADVANCED BUILD',
    dealPrice: 'Check Amazon',
    blurb: 'Fully playable tabletop wooden pinball machine with electronic scoring and lights.',
    amazonUrl: LINKS.dinosaurPinballAmazon,
  },

  // --- CUTEBEE & MINICITY (AMAZON) ---
  {
    id: 'minicity-lib',
    brand: 'MiniCity',
    name: 'MiniCity Beyond Library Book Nook',
    sku: 'Amazon Bestseller',
    categories: ['Cutebee & MiniCity'],
    badge: 'FAST PRIME SHIPPING',
    dealPrice: 'Check Amazon',
    blurb: 'Crisp laser-cut wooden library insert with included dust cover and warm LED lighting.',
    reviewSlug: '/blog/minicity-library-book-nook-review',
    amazonUrl: LINKS.minicityLibraryAmazon,
  },
  {
    id: 'cutebee-owl',
    brand: 'Cutebee',
    name: 'Cutebee Owl Bookstore Book Nook',
    sku: 'SD02 • Quick Build',
    categories: ['Cutebee & MiniCity'],
    badge: 'BEST QUICK BUILD',
    dealPrice: 'Check Amazon',
    blurb: 'Charming vintage bookstore insert—ideal for a relaxing afternoon build or holiday gift.',
    amazonUrl: LINKS.cutebeeOwlAmazon,
  },
  {
    id: 'cutebee-eternal',
    brand: 'Cutebee',
    name: 'Cutebee Eternal Bookstore',
    sku: 'Book Nook Kit',
    categories: ['Cutebee & MiniCity'],
    badge: 'BUDGET FAVORITE',
    dealPrice: 'Check Amazon',
    blurb: 'Classic multi-tier wooden bookshop insert with warm lighting at an accessible price point.',
    amazonUrl: LINKS.cutebeeEternalAmazon,
  },

  // --- HANDS CRAFT & GREENLEAF (AMAZON) ---
  {
    id: 'hc-flower',
    brand: 'Hands Craft',
    name: 'Hands Craft Flower Shop Book Nook',
    sku: 'Beginner Book Nook',
    categories: ['Hands Craft & Greenleaf'],
    badge: 'BEST FOR BEGINNERS',
    dealPrice: 'Check Amazon',
    blurb: 'Bright floral storefront bookshelf insert with approachable assembly for first-time builders.',
    amazonUrl: LINKS.handsCraftFlowerAmazon,
  },
  {
    id: 'hc-garden',
    brand: 'Hands Craft',
    name: 'Hands Craft Secret Garden',
    sku: 'Miniature Kit',
    categories: ['Hands Craft & Greenleaf'],
    badge: 'COZY NATURE BUILD',
    dealPrice: 'Check Amazon',
    blurb: 'Lush miniature botanical retreat filled with greenery, trellises, and garden seating.',
    amazonUrl: LINKS.handsCraftGardenAmazon,
  },
  {
    id: 'greenleaf-harrison',
    brand: 'Greenleaf',
    name: 'Greenleaf Harrison Dollhouse Kit',
    sku: '1:12 Traditional Shell',
    categories: ['Hands Craft & Greenleaf'],
    badge: 'LARGE SCALE CLASSIC',
    dealPrice: 'Check Amazon',
    blurb: 'Full Tudor-style 1:12 wooden dollhouse shell ready for custom painting, wallpaper, and furniture.',
    amazonUrl: LINKS.greenleafHarrisonAmazon,
  },

  // --- HOBBY TOOLS (AMAZON) ---
  {
    id: 'godhand-spn120',
    brand: 'GodHand',
    name: 'GodHand SPN-120 Ultimate Nipper',
    sku: 'Precision Flush Cutter',
    categories: ['Hobby Tools'],
    badge: 'EDITOR TOOL PICK',
    dealPrice: 'Check Amazon',
    blurb: 'Single-blade precision nippers for ultra-clean sprue and tab cuts without splintering tiny parts.',
    reviewSlug: '/blog/godhand-vs-dspiae-the-real-nipper-comparison',
    amazonUrl: LINKS.godHandNipperAmazon,
  },
];

const CATEGORIES: Category[] = [
  'All',
  'Rolife Flash Deals',
  'Rolife',
  'ROKR',
  'Cutebee & MiniCity',
  'Hands Craft & Greenleaf',
  'Hobby Tools',
];

export default function DealsClient() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!EVENT_CONFIG.countdownTargetIso) {
      setTimeLeft(null);
      return;
    }

    const targetDate = new Date(EVENT_CONFIG.countdownTargetIso).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      const input = document.createElement('input');
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const filteredDeals =
    activeCategory === 'All'
      ? FEATURED_DEALS
      : FEATURED_DEALS.filter((d) => d.categories.includes(activeCategory));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* SLIM STICKY RETURN NAVIGATION (OPTION 2) */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-sm border-b border-white/10 text-slate-200 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-extrabold text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span aria-hidden="true">←</span>
            <span>CraftsAndKits.com</span>
          </Link>

          <nav aria-label="Deals quick navigation" className="flex items-center gap-4 sm:gap-6 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href={EVENT_CONFIG.guideHref}
              className="hover:text-white transition-colors"
            >
              {EVENT_CONFIG.guideNavLabel}
            </Link>
            <a
              href="#rescue-handbook"
              className="hidden sm:inline-block text-amber-300 hover:text-amber-200 transition-colors"
            >
              Rescue Handbook
            </a>
          </nav>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 text-xs md:text-sm font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            {EVENT_CONFIG.badgeText}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {EVENT_CONFIG.heroTitle}
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            {EVENT_CONFIG.heroSubtitle}
          </p>

          {/* LIVE COUNTDOWN */}
          {timeLeft && (
            <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 mb-8">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold hidden sm:inline">
                {EVENT_CONFIG.countdownLabel}
              </span>
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hrs', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds },
              ].map((unit) => (
                <div key={unit.label} className="text-center min-w-[44px]">
                  <div className="text-xl sm:text-2xl font-extrabold tabular-nums">
                    {String(unit.val).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-blue-200">{unit.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* QUICK JUMP BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={LINKS.rolifeStoreHome}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              {EVENT_CONFIG.primaryCtaLabel}
            </a>
            <a
              href="#deals-grid-heading"
              className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold py-3.5 px-7 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              {EVENT_CONFIG.secondaryCtaLabel}
            </a>
          </div>

          <p className="text-xs text-blue-200/70 mt-6">
            Affiliate Disclosure: As an Amazon Associate and Rolife affiliate, CraftsAndKits earns from qualifying purchases at no extra cost to you.
          </p>
        </div>
      </section>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        {/* SECTION 1: COPYABLE PROMO CODES */}
        {PROMO_CODES.length > 0 && (
          <section aria-labelledby="codes-heading" className="mb-14">
            <h2 id="codes-heading" className="sr-only">
              Active Promo Codes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {PROMO_CODES.map((promo) => {
                const isCopied = copiedId === promo.id;
                return (
                  <div
                    key={promo.id}
                    className={`rounded-2xl p-6 bg-white shadow-md flex flex-col justify-between border-2 transition-shadow hover:shadow-lg ${
                      promo.highlight ? 'border-blue-600' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                          {promo.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {promo.brand}
                      </p>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-2">
                        {promo.headline}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5">
                        {promo.details}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 bg-slate-100 border border-dashed border-slate-400 rounded-xl p-2 pl-4">
                        <code className="font-mono font-extrabold text-base text-slate-900 tracking-wider">
                          {promo.code}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopy(promo.id, promo.code)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          {isCopied ? '✓ Copied!' : 'Copy Code'}
                        </button>
                      </div>

                      <a
                        href={promo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors"
                      >
                        {promo.ctaLabel}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-xs sm:text-sm text-slate-600 mt-4 max-w-3xl mx-auto">
              <strong>Checkout Tip:</strong> Rolife codes work on official store orders only (one code per order; flash deals up to 50% off must be checked out separately). Prefer 2-day delivery? Use the orange Amazon buttons below.
            </p>
          </section>
        )}

        {/* SECTION 2: FILTERABLE BRAND DEALS GRID */}
        <section aria-labelledby="deals-grid-heading" className="mb-16 scroll-mt-16">
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <h2
                id="deals-grid-heading"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 scroll-mt-16"
              >
                {EVENT_CONFIG.gridHeading}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                {EVENT_CONFIG.gridSubheading}
              </p>
            </div>

            {/* BRAND CATEGORY TABS */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => {
              const isCodeCopied = copiedId === `deal-${deal.id}`;
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          deal.isFlashDeal
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {deal.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {deal.sku}
                      </span>
                    </div>

                    <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-1">
                      {deal.brand}
                    </p>

                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-2">
                      {deal.name}
                    </h3>

                    <div className="flex items-baseline gap-2.5 mb-3 flex-wrap">
                      <span className="text-xl font-extrabold text-emerald-700">
                        {deal.dealPrice}
                      </span>
                      {deal.regularPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {deal.regularPrice}
                        </span>
                      )}
                      {deal.codeToUse && (
                        <button
                          type="button"
                          onClick={() => handleCopy(`deal-${deal.id}`, deal.codeToUse!)}
                          className="ml-auto text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer"
                          title="Click to copy Rolife promo code"
                        >
                          {isCodeCopied ? '✓ Copied' : `Code: ${deal.codeToUse}`}
                        </button>
                      )}
                      {deal.isFlashDeal && (
                        <span className="ml-auto text-[11px] font-bold px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200">
                          No Code Needed
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {deal.blurb}
                    </p>

                    {deal.reviewSlug && (
                      <Link
                        href={deal.reviewSlug}
                        className="inline-block text-xs font-bold text-blue-600 hover:underline mb-4"
                      >
                        Read Our Hands-On Review →
                      </Link>
                    )}
                  </div>

                  {/* DUAL ACTION BUTTONS */}
                  <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                    {deal.rolifeUrl && (
                      <a
                        href={deal.rolifeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
                      >
                        Buy Direct from Rolife ↗
                      </a>
                    )}
                    {deal.amazonUrl && (
                      <a
                        href={deal.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center bg-orange-400 hover:bg-orange-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
                      >
                        Check Price on Amazon ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: GUMROAD $9.99 FLASH SALE */}
        <section
          id="rescue-handbook"
          className="mb-14 scroll-mt-16 p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl shadow-xl border border-blue-800/60"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 lg:w-2/3">
              <span className="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                Black Friday Flash Sale • Save 33%
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                The Miniature Maker&apos;s Rescue Handbook — Just $9.99
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Stocking up on holiday kits? Don&apos;t let snapped laser-cut wood, CA-fogged windows, or dead LEDs ruin a $60 build. Grab my 17-page field manual—packed with 25 hands-on rescue techniques plus printable glue, scale, and wiring charts (normally $14.99).
              </p>
            </div>
            <div className="w-full lg:w-auto flex-shrink-0">
              <a
                href={LINKS.gumroadSale}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full lg:w-auto text-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-4 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 text-base"
              >
                Grab the $9.99 Rescue Handbook ↗
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERNAL LINK HUB TO SEASONAL GUIDE */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">
              {EVENT_CONFIG.guideCtaTitle}
            </h2>
            <p className="text-sm text-slate-600">{EVENT_CONFIG.guideCtaText}</p>
          </div>
          <Link
            href={EVENT_CONFIG.guideHref}
            className="whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
          >
            {EVENT_CONFIG.guideCtaButton}
          </Link>
        </section>
      </main>

      {/* MINIMAL RETURN FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-white/10 py-8 px-4 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} CraftsAndKits.com • Independent Miniature Reviews &amp; Deals
          </p>
          <div className="flex items-center gap-5 font-semibold text-slate-300">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              ← Back to CraftsAndKits.com
            </Link>
            <Link
              href={EVENT_CONFIG.guideHref}
              className="hover:text-white transition-colors"
            >
              {EVENT_CONFIG.guideNavLabel}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
