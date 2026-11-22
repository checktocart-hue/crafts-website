'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// 1. AFFILIATE LINKS (ALL ROLIFE IMPACT LINKS LIVE — ADD YOUR AMAZON LINKS)
// =========================================================================
const LINKS = {
  // Tip: Create an Impact link for https://www.rolifeonline.com/pages/black-friday-sale
  // and replace rolifeStoreHome below for best BFCM20/BFCM25 conversions.
  rolifeStoreHome: 'https://rolife.pxf.io/DWxGvb',

  // Paste your Amazon Associate links here (leave '' to hide an Amazon button)
  amazonDealsPage: 'https://amzn.to/YOUR_AMAZON_MINIATURE_DEALS_LINK',
  streetSceneAmazon: '',
  kikisEmporiumAmazon: '',
  minicityLibraryAmazon: 'https://amzn.to/YOUR_MINICITY_AMAZON_LINK',

  // Gumroad Rescue Handbook (append /BFCM26 once you create the $5 off code)
  gumroadSale: 'https://craftsman353.gumroad.com/l/miniature-guide',

  // Verified Rolife Impact Deep Links
  streetSceneRolife: 'https://rolife.pxf.io/aNgRzR',      // TGB13
  nightOutStallRolife: 'https://rolife.pxf.io/DWo0M2',    // DW022 (subId1=crafts)
  cookiiBunnyRolife: 'https://rolife.pxf.io/5kraB2',      // DG177
  carolingCathedralRolife: 'https://rolife.pxf.io/2RNbNa',// TGB26
  teddysToyShopRolife: 'https://rolife.pxf.io/gR0PeA',    // DG189
  floralPerfumeRolife: 'https://rolife.pxf.io/1GxeM9',    // DG188
  firesideMusicRolife: 'https://rolife.pxf.io/3kQAqM',    // AMS03
  polarisPostRolife: 'https://rolife.pxf.io/VOX9MM',      // DG187
  superCreatorRolife: 'https://rolife.pxf.io/yZMgP3',     // Super Creator Hub
  kikisEmporiumRolife: 'https://rolife.pxf.io/DWNDob',    // DG155
};

// =========================================================================
// 2. ACTIVE PROMO CODES (VERIFIED THROUGH DEC 1, 2026 AT 12:00 PM PST)
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
      'Works with no minimum spend on eligible kits through Dec 1 (12:00 PM PST), plus free shipping on orders over $68 USD.',
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
    ctaLabel: 'Shop Super Creator & Bundles ↗',
    url: LINKS.superCreatorRolife,
    highlight: true,
  },
];

// =========================================================================
// 3. FEATURED LIVE DEALS (COMMISSION-VERIFIED BUCKETS)
// =========================================================================
type Category =
  | 'All'
  | 'Flash Deals'
  | 'Book Nooks'
  | 'Miniature Houses'
  | 'Holiday & Music'
  | 'Amazon Prime';

interface DealItem {
  id: string;
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
  {
    id: 'tgb13',
    name: 'Rolife Street Scene Book Nook',
    sku: 'TGB13 • Direct Flash Deal',
    categories: ['Flash Deals', 'Book Nooks'],
    badge: '50% OFF FLASH DEAL',
    regularPrice: '$49.99',
    dealPrice: '$25.00',
    isFlashDeal: true,
    blurb: 'Vibrant vintage street-alley bookshelf insert at half off while Rolife flash-deal stock lasts.',
    rolifeUrl: LINKS.streetSceneRolife,
    amazonUrl: LINKS.streetSceneAmazon || undefined,
  },
  {
    id: 'dw022',
    name: 'Rolife Night Out Food Stall',
    sku: 'DW022 • Super Creator',
    categories: ['Flash Deals', 'Miniature Houses'],
    badge: '50% OFF FLASH DEAL',
    regularPrice: '$43.99',
    dealPrice: 'From $22.00',
    isFlashDeal: true,
    blurb: 'Snap-together Super Creator late-night street food stall. Limited flash-deal inventory.',
    rolifeUrl: LINKS.nightOutStallRolife,
  },
  {
    id: 'dg177',
    name: "Rolife Cookii Bunny's Cookie Shop",
    sku: 'DG177 • Direct Flash Deal',
    categories: ['Flash Deals', 'Miniature Houses'],
    badge: '30% OFF FLASH DEAL',
    regularPrice: '$33.99',
    dealPrice: '$23.79',
    isFlashDeal: true,
    blurb: 'Compact, beginner-friendly miniature bakery room box marked down 30% direct from Rolife.',
    rolifeUrl: LINKS.cookiiBunnyRolife,
  },
  {
    id: 'tgb26',
    name: 'Rolife Caroling Cathedral Book Nook',
    sku: 'TGB26 • 503 pcs',
    categories: ['Book Nooks', 'Holiday & Music'],
    badge: '2026 HOLIDAY FLAGSHIP',
    regularPrice: '$58.99',
    dealPrice: '$47.19',
    codeToUse: 'BFCM20',
    blurb: 'Detailed festive Gothic cathedral bookshelf insert with stained-glass accents and warm lighting.',
    rolifeUrl: LINKS.carolingCathedralRolife,
  },
  {
    id: 'dg189',
    name: "Rolife Teddy's Toy Shop",
    sku: 'DG189 • 335 pcs • Type-C',
    categories: ['Miniature Houses', 'Holiday & Music'],
    badge: 'UNDER $40 WITH CODE',
    regularPrice: '$49.99',
    dealPrice: '$39.99',
    codeToUse: 'BFCM20',
    blurb: 'European-style vintage toy shop miniature house (~6-hour build) with Type-C LED lighting.',
    rolifeUrl: LINKS.teddysToyShopRolife,
  },
  {
    id: 'dg188',
    name: 'Rolife Floral Perfume Shop',
    sku: 'DG188 • 347 pcs • Type-C',
    categories: ['Miniature Houses'],
    badge: 'UNDER $40 WITH CODE',
    regularPrice: '$49.99',
    dealPrice: '$39.99',
    codeToUse: 'BFCM20',
    blurb: 'Parisian-inspired fragrance boutique (~6-hour build) with glowing shelves and modular walls.',
    rolifeUrl: LINKS.floralPerfumeRolife,
  },
  {
    id: 'ams03',
    name: 'Rolife Fireside Music Night',
    sku: 'AMS03 • DIY Music Box',
    categories: ['Holiday & Music'],
    badge: 'UNDER $30 GIFT PICK',
    regularPrice: '$32.99',
    dealPrice: '$26.39',
    codeToUse: 'BFCM20',
    blurb: 'Cozy holiday fireplace diorama combined with a wind-up music box—easy gift pairing for $120+ carts.',
    rolifeUrl: LINKS.firesideMusicRolife,
  },
  {
    id: 'dg187',
    name: 'Rolife Polaris Post Miniature House',
    sku: 'DG187 • Holiday Release',
    categories: ['Holiday & Music', 'Miniature Houses'],
    badge: 'HANDS-ON TESTED',
    dealPrice: '20% Off',
    codeToUse: 'BFCM20',
    blurb: 'Festive North Pole post office miniature build—pair with other kits to hit free shipping ($68+).',
    reviewSlug: '/blog/rolife-polaris-post-dg187-review',
    rolifeUrl: LINKS.polarisPostRolife,
  },
  {
    id: 'super-creator',
    name: 'Rolife Super Creator Multi-Kit Sets',
    sku: 'Stackable Snap-Fit Rooms',
    categories: ['Miniature Houses', 'Holiday & Music'],
    badge: 'BEST FOR BFCM25 ($120+)',
    dealPrice: 'Up to 25% Off',
    codeToUse: 'BFCM25',
    blurb: 'Build a stackable miniature apartment block. Combine 3–4 Super Creator rooms past $120 to unlock 25% off.',
    rolifeUrl: LINKS.superCreatorRolife,
  },
  {
    id: 'dg155',
    name: "Rolife Kiki's Magic Emporium",
    sku: 'DG155 • Classic Bestseller',
    categories: ['Miniature Houses', 'Amazon Prime'],
    badge: 'FAN FAVORITE',
    dealPrice: '20% Off Direct',
    codeToUse: 'BFCM20',
    blurb: 'Whimsical witchy shop packed with tiny potion bottles, broomsticks, and spellbooks.',
    rolifeUrl: LINKS.kikisEmporiumRolife,
    amazonUrl: LINKS.kikisEmporiumAmazon || undefined,
  },
  {
    id: 'minicity-lib',
    name: 'MiniCity Beyond Library Book Nook',
    sku: 'Amazon Prime Pick',
    categories: ['Book Nooks', 'Amazon Prime'],
    badge: 'FAST PRIME SHIPPING',
    dealPrice: 'Check Amazon',
    blurb: 'Crisp laser-cut wooden library insert with included dust cover and warm LEDs via Amazon Prime.',
    reviewSlug: '/blog/minicity-library-book-nook-review',
    amazonUrl: LINKS.minicityLibraryAmazon || undefined,
  },
];

const CATEGORIES: Category[] = [
  'All',
  'Flash Deals',
  'Book Nooks',
  'Miniature Houses',
  'Holiday & Music',
  'Amazon Prime',
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

  // Countdown to end of Rolife Black Friday Sale (Dec 1, 2026 at 12:00 PM PST / 20:00 UTC)
  useEffect(() => {
    const targetDate = new Date('2026-12-01T20:00:00Z').getTime();

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
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 text-xs md:text-sm font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Live 2026 Black Friday &amp; Cyber Monday Hub
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Verified Rolife &amp; Miniature Kit Black Friday Codes
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Copy working 20%–25% off Rolife promo codes in one tap, catch 30%–50% direct flash deals, and check Amazon Prime alternatives.
          </p>

          {/* LIVE COUNTDOWN */}
          {timeLeft && (
            <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 mb-8">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold hidden sm:inline">
                Codes Expire Dec 1 (12 PM PST):
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
              Shop Rolife Black Friday (Up to 50% Off) ↗
            </a>
            <a
              href={LINKS.amazonDealsPage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold py-3.5 px-7 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Browse Amazon Prime Deals ↗
            </a>
          </div>

          <p className="text-xs text-blue-200/70 mt-6">
            Affiliate Disclosure: Purchases through our links may earn CraftsAndKits a small commission at no extra cost to you.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* SECTION 1: COPYABLE PROMO CODES (2-COLUMN CLEAN GRID) */}
        <section aria-labelledby="codes-heading" className="mb-14">
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
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-1 mb-2">
                      {promo.headline}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {promo.details}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* COPY BOX */}
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
            <strong>Checkout Tip:</strong> Rolife allows one discount code per order, and flash deals (up to 50% off) cannot be combined with promo codes. Order flash-deal kits separately so{' '}
            <code className="font-mono font-bold text-slate-800">BFCM20</code> or{' '}
            <code className="font-mono font-bold text-slate-800">BFCM25</code> applies to your other items.
          </p>
        </section>

        {/* SECTION 2: FILTERABLE LIVE DEALS GRID */}
        <section aria-labelledby="deals-grid-heading" className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2
                id="deals-grid-heading"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900"
              >
                Verified 2026 Rolife &amp; Miniature Deals
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Prices checked Nov 21–22, 2026. Flash-deal prices and stock levels update frequently—click through to verify live availability.
              </p>
            </div>

            {/* CATEGORY TABS */}
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

                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-2">
                      {deal.name}
                    </h3>

                    <div className="flex items-baseline gap-2.5 mb-3 flex-wrap">
                      <span className="text-2xl font-extrabold text-emerald-700">
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
                          title="Click to copy promo code"
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

                  {/* ACTION BUTTONS (AUTO-HIDES AMAZON WHEN NOT APPLICABLE) */}
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
        <section className="mb-14 p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl shadow-xl border border-blue-800/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 lg:w-2/3">
              <span className="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                Black Friday Flash Sale • Save 33%
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                The Miniature Maker&apos;s Rescue Handbook — Just $9.99
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Stocking up on Black Friday kits? Don&apos;t let snapped laser-cut wood, CA-fogged windows, or dead LEDs ruin a $60 build. Grab my 17-page field manual—packed with 25 hands-on rescue techniques plus printable glue, scale, and wiring charts (normally $14.99).
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

        {/* SECTION 4: INTERNAL LINK HUB TO BUYER'S GUIDE */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">
              Not sure whether to buy Direct or on Amazon?
            </h2>
            <p className="text-sm text-slate-600">
              Read our complete 2026 Black Friday Miniature Buyer&apos;s Guide for fake-deal warnings, beginner recommendations, and tool deals.
            </p>
          </div>
          <Link
            href="/blog/black-friday-miniatures-craft-kit-deals"
            className="whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
          >
            Read the Buyer&apos;s Guide →
          </Link>
        </section>
      </main>
    </div>
  );
}
