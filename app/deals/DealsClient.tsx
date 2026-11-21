'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// 1. UPDATE YOUR AFFILIATE LINKS HERE (SINGLE SOURCE OF TRUTH)
// =========================================================================
const LINKS = {
  rolifeStoreHome: 'https://YOUR_ROLIFE_IMPACT_BLACK_FRIDAY_LINK',
  amazonDealsPage: 'https://amzn.to/YOUR_AMAZON_MINIATURE_DEALS_LINK',
  gumroadSale: 'https://craftsman353.gumroad.com/l/miniature-guide',

  // Individual Featured Kits (Direct Rolife Impact + Amazon)
  cuckooClockRolife: 'https://YOUR_ROLIFE_IMPACT_LCB01_LINK',
  cuckooClockAmazon: 'https://amzn.to/YOUR_LCB01_AMAZON_LINK',

  teddysToyShopRolife: 'https://YOUR_ROLIFE_IMPACT_DG189_LINK',
  teddysToyShopAmazon: 'https://amzn.to/YOUR_DG189_AMAZON_LINK',

  floralPerfumeRolife: 'https://YOUR_ROLIFE_IMPACT_DG188_LINK',
  floralPerfumeAmazon: 'https://amzn.to/YOUR_DG188_AMAZON_LINK',

  harvestWindmillRolife: 'https://YOUR_ROLIFE_IMPACT_LCA01_LINK',
  harvestWindmillAmazon: 'https://amzn.to/YOUR_LCA01_AMAZON_LINK',

  dinosaurPinballRolife: 'https://YOUR_ROLIFE_IMPACT_MGP01_LINK',
  dinosaurPinballAmazon: 'https://amzn.to/YOUR_MGP01_AMAZON_LINK',

  holidayBundleRolife: 'https://YOUR_ROLIFE_IMPACT_BUNDLE_LINK',
  sakuraDensyaRolife: 'https://YOUR_ROLIFE_IMPACT_TGB01_LINK',
  sakuraDensyaAmazon: 'https://amzn.to/YOUR_TGB01_AMAZON_LINK',
  minicityLibraryAmazon: 'https://amzn.to/YOUR_MINICITY_AMAZON_LINK',
};

// =========================================================================
// 2. ACTIVE PROMO CODES (VERIFIED NOV 2026)
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
    brand: 'Rolife & ROKR Official Store',
    badge: 'MOST POPULAR • NO MINIMUM',
    headline: '20% OFF Sitewide',
    details: 'Works with no minimum spend on eligible Black Friday kits + free shipping over $68 USD.',
    code: 'BFCM20',
    ctaLabel: 'Apply at Rolife Store ↗',
    url: LINKS.rolifeStoreHome,
    highlight: true,
  },
  {
    id: 'bfcm25',
    brand: 'Rolife & ROKR Official Store',
    badge: 'BIGGEST SAVINGS • $120+ ORDERS',
    headline: '25% OFF Orders $120+',
    details: 'Best for buying 2–3 gifts or big ROKR mechanical puzzles like Dinosaur Lab Pinball. One code per order.',
    code: 'BFCM25',
    ctaLabel: 'Shop $120+ Bundles ↗',
    url: LINKS.rolifeStoreHome,
    highlight: true,
  },
  {
    id: 'evergreen12',
    brand: 'CraftsAndKits Exclusive',
    badge: 'BACKUP / FULL-PRICE KITS',
    headline: '12% OFF Eligible Kits',
    details: 'Keep this code handy for non-sale new arrivals or after Cyber Monday ends on Nov 30.',
    code: 'YOUR_12%_CODE', // Replace with your personal Impact affiliate code
    ctaLabel: 'Shop Rolife Direct ↗',
    url: LINKS.rolifeStoreHome,
  },
];

// =========================================================================
// 3. FEATURED LIVE DEALS
// =========================================================================
type Category = 'All' | 'Book Nooks' | 'Miniature Houses' | 'ROKR Mechanical' | 'Bundles';

interface DealItem {
  id: string;
  name: string;
  sku: string;
  category: Exclude<Category, 'All'>;
  badge: string;
  regularPrice: string;
  dealPrice: string;
  codeToUse?: string;
  blurb: string;
  reviewSlug?: string;
  rolifeUrl?: string;
  amazonUrl?: string;
}

const FEATURED_DEALS: DealItem[] = [
  {
    id: 'lcb01',
    name: 'ROKR Christmas Cuckoo Clock',
    sku: 'LCB01 • 293 pcs',
    category: 'ROKR Mechanical',
    badge: 'HANDS-ON TESTED',
    regularPrice: '$75.99',
    dealPrice: '$55.99',
    codeToUse: 'BFCM20',
    blurb: 'Working quartz clock with hourly cuckoo bird, gliding Santa sleigh, music & warm LEDs.',
    reviewSlug: '/blog/rokr-christmas-cuckoo-clock-lcb01-review',
    rolifeUrl: LINKS.cuckooClockRolife,
    amazonUrl: LINKS.cuckooClockAmazon,
  },
  {
    id: 'dg189',
    name: "Rolife Teddy's Toy Shop",
    sku: 'DG189 • Glue-Free',
    category: 'Miniature Houses',
    badge: 'UNDER $40 WITH CODE',
    regularPrice: '$49.99',
    dealPrice: '$39.99',
    codeToUse: 'BFCM20',
    blurb: 'Cozy vintage toy shop miniature house with USB-C lighting and fast snap-fit assembly.',
    rolifeUrl: LINKS.teddysToyShopRolife,
    amazonUrl: LINKS.teddysToyShopAmazon,
  },
  {
    id: 'dg188',
    name: 'Rolife Floral Perfume Shop',
    sku: 'DG188 • Glue-Free',
    category: 'Miniature Houses',
    badge: 'UNDER $40 WITH CODE',
    regularPrice: '$49.99',
    dealPrice: '$39.99',
    codeToUse: 'BFCM20',
    blurb: 'Detailed Parisian-style fragrance boutique with glowing display shelves.',
    rolifeUrl: LINKS.floralPerfumeRolife,
    amazonUrl: LINKS.floralPerfumeAmazon,
  },
  {
    id: 'lca01',
    name: 'ROKR Harvest Windmill Table Clock',
    sku: 'LCA01 • 563 pcs',
    category: 'ROKR Mechanical',
    badge: '20% OFF DEAL',
    regularPrice: '$78.99',
    dealPrice: '$63.19',
    codeToUse: 'BFCM20',
    blurb: 'Mechanical Dutch windmill that functions as both a working clock and touch music box.',
    rolifeUrl: LINKS.harvestWindmillRolife,
    amazonUrl: LINKS.harvestWindmillAmazon,
  },
  {
    id: 'mgp01',
    name: 'ROKR Dinosaur Lab Pinball',
    sku: 'MGP01 • Advanced',
    category: 'ROKR Mechanical',
    badge: 'QUALIFIES FOR BFCM25',
    regularPrice: '$129.99',
    dealPrice: '$97.49',
    codeToUse: 'BFCM25',
    blurb: 'Fully playable tabletop wooden pinball machine. Crosses $120 solo to unlock 25% off.',
    rolifeUrl: LINKS.dinosaurPinballRolife,
    amazonUrl: LINKS.dinosaurPinballAmazon,
  },
  {
    id: 'bundle-xmas',
    name: 'Reindeer Express + Polaris Post Bundle',
    sku: 'DS059 + DG187',
    category: 'Bundles',
    badge: '2-KIT GIFT BUNDLE',
    regularPrice: '$73.98',
    dealPrice: '$59.20',
    codeToUse: 'BFCM20',
    blurb: 'Two festive Rolife holiday builds in one discounted bundle—ideal for weekend crafting.',
    reviewSlug: '/blog/rolife-polaris-post-dg187-review',
    rolifeUrl: LINKS.holidayBundleRolife,
  },
  {
    id: 'tgb01',
    name: 'Rolife Sakura Densya Book Nook',
    sku: 'TGB01 • Bestseller',
    category: 'Book Nooks',
    badge: 'READER FAVORITE',
    regularPrice: '$49.99',
    dealPrice: 'Check Sale',
    codeToUse: 'BFCM20',
    blurb: 'The iconic Tokyo cherry-blossom tram book nook with touch-switch warm lighting.',
    reviewSlug: '/blog/robotime-sakura-densya-review',
    rolifeUrl: LINKS.sakuraDensyaRolife,
    amazonUrl: LINKS.sakuraDensyaAmazon,
  },
  {
    id: 'minicity-lib',
    name: 'MiniCity Beyond Library Book Nook',
    sku: 'Amazon Prime Pick',
    category: 'Book Nooks',
    badge: 'FAST PRIME SHIPPING',
    regularPrice: '$45.99',
    dealPrice: 'Check Amazon',
    blurb: 'Crisp laser-cut wooden library insert with included dust cover and warm LEDs.',
    reviewSlug: '/blog/minicity-library-book-nook-review',
    amazonUrl: LINKS.minicityLibraryAmazon,
  },
];

const CATEGORIES: Category[] = [
  'All',
  'Book Nooks',
  'Miniature Houses',
  'ROKR Mechanical',
  'Bundles',
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

  // Countdown to end of Cyber Monday (Nov 30, 2026, 11:59 PM PT)
  useEffect(() => {
    const targetDate = new Date('2026-12-01T07:59:59Z').getTime();

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
      // Fallback for older mobile browsers
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
      : FEATURED_DEALS.filter((d) => d.category === activeCategory);

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
            Verified Rolife, ROKR &amp; Miniature Kit Promo Codes
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Copy working 20%–25% off codes in one tap, compare official brand pricing against Amazon Prime, and lock in holiday builds before stock sells out.
          </p>

          {/* LIVE COUNTDOWN */}
          {timeLeft && (
            <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 mb-8">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold hidden sm:inline">
                Sale Ends In:
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
        {/* SECTION 1: COPYABLE PROMO CODES */}
        <section aria-labelledby="codes-heading" className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        </section>

        {/* SECTION 2: FILTERABLE LIVE DEALS GRID */}
        <section aria-labelledby="deals-grid-heading" className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2
                id="deals-grid-heading"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900"
              >
                Top Verified 2026 Kit Deals
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Prices reflect official Black Friday coupon discounts and may vary by region or stock.
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
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">
                        {deal.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {deal.sku}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-2">
                      {deal.name}
                    </h3>

                    <div className="flex items-baseline gap-2.5 mb-3">
                      <span className="text-2xl font-extrabold text-emerald-700">
                        {deal.dealPrice}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        {deal.regularPrice}
                      </span>
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
        <section className="mb-14 p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl shadow-xl border border-blue-800/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 lg:w-2/3">
              <span className="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                Black Friday Flash Sale • Save 33%
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Zero to Finished Miniature Blueprint — Just $9.99
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Stocking up on Black Friday kits? Skip the snapped laser-cut wood, messy glue smudges, and dead LEDs. My 6-module digital guide walks you through invisible seams, clean micro-wiring, and rescuing broken parts (normally $14.99).
              </p>
            </div>
            <div className="w-full lg:w-auto flex-shrink-0">
              <a
                href={LINKS.gumroadSale}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full lg:w-auto text-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-4 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 text-base"
              >
                Grab the $9.99 Flash Sale ↗
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
