import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

// =========================================================================
// 1. HANDBOOK SETTINGS (UPDATE PRICE OR URL IN ONE PLACE)
// =========================================================================
const HANDBOOK_CONFIG = {
  // Tip: Append /BFCM26 if using a Gumroad discount code, or ?wanted=true
  // to open straight to the payment step inside Gumroad's overlay modal.
  gumroadUrl: 'https://craftsman353.gumroad.com/l/miniature-guide?wanted=true',
  currentPrice: '$9.99',
  futurePrice: '$14.99',
  promoBadge: 'Black Friday Introductory Price • Through Dec 1',
  promoNote: 'Introductory $9.99 rate through Dec 1, 2026 (moves to $14.99 on Dec 2).',
  supportEmail: 'craftsandkits.com@gmail.com', // Update with your real support email
  // Optional: Drop your exported cover photo into public/images/handbook-cover.webp
  // and set this to '/images/handbook-cover.webp'. Leave '' to show the built-in mockup.
  coverImagePath: '',
};

export const metadata: Metadata = {
  title: "The Miniature Maker's Rescue Handbook | CraftsAndKits",
  description:
    '25 step-by-step miniature & book nook fixes, 6 workshop photos, 8 diagrams & printable glue, scale, and LED charts. Instant PDF by Rashy Michaels.',
  alternates: {
    canonical: 'https://www.craftsandkits.com/handbook',
  },
  openGraph: {
    title: "The Miniature Maker's Rescue Handbook (Illustrated Edition v2)",
    description:
      '25 hands-on workshop fixes, 6 editorial photos, 8 custom diagrams, and printable desk charts for book nook and dollhouse builders.',
    url: 'https://www.craftsandkits.com/handbook',
    type: 'website',
  },
};

const MODULES = [
  {
    num: 'Module 1',
    fixes: 'Fixes 01–04',
    title: 'Pre-Build Setup, 9-Piece Toolkit & Clean Part Removal',
    visuals: '2 Photos • 1 Diagram',
    bullets: [
      'The 9-piece beginner starter toolkit and 10-minute pre-build board & LED audit.',
      'Stage-by-stage parts sorting so tiny tabs and props never vanish off your mat.',
      'Scoring fragile laser bridges vertically with a #11 blade instead of twisting parts out.',
    ],
  },
  {
    num: 'Module 2',
    fixes: 'Fixes 05–08',
    title: 'Precision Fit, Tight Slots & Structural Squaring',
    visuals: '2 Diagrams',
    bullets: [
      'The Pencil-Transfer Method to locate exact tight spots without over-sanding joints.',
      'Tightening loose or undersized wooden tabs rock-solid with PVA tissue shims.',
      'Locking leaning walls square using hidden 90° waste-frame corner gussets.',
    ],
  },
  {
    num: 'Module 3',
    fixes: 'Fixes 09–13',
    title: 'Clean Adhesives, Wallpaper & Clear Window Rescues',
    visuals: '1 Photo • 2 Diagrams • Matrix',
    bullets: [
      'Full Glue-to-Material Compatibility Matrix with clear-plastic scrap-test rules.',
      'Toothpick micro-gluing from scrap cardstock to stop shiny squeeze-out and floods.',
      'Replacing super-glue-fogged clear windows cleanly with flat packaging acetate.',
    ],
  },
  {
    num: 'Module 4',
    fixes: 'Fixes 14–18',
    title: 'Structural Wood & Delicate Part Repairs',
    visuals: '1 Photo',
    bullets: [
      'Invisible rear waste-frame wood splints for snapped tabs and load-bearing frames.',
      'Flattening delaminated plywood layers and relaxing warped roof or floor boards.',
      'Smooth steps for documenting missing parts and checking manufacturer support.',
    ],
  },
  {
    num: 'Module 5',
    fixes: 'Fixes 19–20',
    title: 'Verified Scale Math & Scratch-Built Furniture',
    visuals: '2 Diagrams • Scale Table',
    bullets: [
      'Verified 1:12, 1:24, and 1:48 reference chart (doorways, tables, chairs, and books).',
      'Doorway ruler check so you stop buying oversized furniture and accessories.',
      '3-step workflow for fabricating lost shelves and trim from leftover kit borders.',
    ],
  },
  {
    num: 'Module 6',
    fixes: 'Fixes 21–25',
    title: 'Micro-LED Wiring, Troubleshooting & Display Care',
    visuals: '1 Photo • 1 Diagram • LED Table',
    bullets: [
      '3 pre-seal bench checkpoints across 3V–4.5V cells, coin cells, and 5V USB-C kits.',
      '6-stage LED fault isolation table before pulling apart a single glued wall.',
      'Stripping hair-thin 30 AWG kit wires safely, hidden corner routing, and dust care.',
    ],
  },
];

const PAIN_POINTS = [
  {
    tag: 'Fixes 04–07 & 14–15',
    title: 'Tight or Snapped Wood Tabs',
    text: 'Stop forcing swollen laser-cut slots. Find the exact bind point with graphite transfer—or reinforce a snapped tab invisibly from behind.',
  },
  {
    tag: 'Fixes 09–12',
    title: 'Cloudy Windows & Glue Blobs',
    text: 'Match every surface to the right adhesive, ditch messy nozzles for toothpick micro-beads, and replace frosted windows with clear acetate.',
  },
  {
    tag: 'Fix 13',
    title: 'Bubbled & Wrinkled Wallpaper',
    text: 'Eliminate soggy ripples and curling edges with low-moisture adhesive selection and scrap-paper center-out burnishing.',
  },
  {
    tag: 'Fixes 21–24',
    title: 'Dark LEDs & Fragile Wires',
    text: 'Walk through 6 structured power, polarity, switch, and JST plug checks—and re-splice snapped 30 AWG wires without severing copper strands.',
  },
];

const FAQS = [
  {
    q: 'Does this handbook work for Rolife, Cutebee, MiniCity, and ROKR kits?',
    a: 'Yes. The 25 workshop techniques cover universal wood, paper, clear plastic, scale, and low-voltage LED challenges shared across DIY book nooks, miniature houses, and room boxes. Always follow your specific kit manual for model-specific assembly order and battery voltage.',
  },
  {
    q: 'Can I print the checklists and reference charts for my craft desk?',
    a: 'Yes. Your personal license encourages you to print the 25-Point Pre-Build & Rescue Checklist, Glue-to-Material Compatibility Matrix, Scale Reference Table, and Emergency Triage Chart for your own workbench.',
  },
  {
    q: 'How is the handbook delivered after checkout?',
    a: 'Immediately after payment via Gumroad, you receive an instant download link on screen and by email for the high-resolution Illustrated Edition (v2) PDF—formatted for phones, tablets, laptops, and clean home printing.',
  },
  {
    q: 'Does the PDF contain ads or cluttered affiliate links?',
    a: 'No. The handbook is completely ad-free and contains zero embedded affiliate links so it stays clean and timeless at your bench. Whenever you want updated tool or kit picks, it points cleanly to CraftsAndKits.com/toolkit and /deals.',
  },
  {
    q: 'What is your refund policy?',
    a: `Because this handbook is delivered as an instant digital PDF download, all sales are final and non-refundable. If you ever hit a download snag, receive a corrupted file, or accidentally order twice, email ${HANDBOOK_CONFIG.supportEmail} with your Gumroad receipt and we will resolve it promptly.`,
  },
];

export default function HandbookSalesPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#222831] flex flex-col">
      {/* GUMROAD OVERLAY SCRIPT (LOADED ONCE FOR ALL CUSTOM BUTTONS) */}
      <Script src="https://gumroad.com/js/gumroad.js" strategy="afterInteractive" />

      {/* SLIM STICKY RETURN NAV */}
      <header className="sticky top-0 z-40 bg-[#132238]/95 backdrop-blur-sm border-b border-[#C59B43]/30 text-slate-200 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-extrabold text-white hover:text-[#F4E8CC] transition-colors inline-flex items-center gap-1.5"
          >
            <span aria-hidden="true">←</span>
            <span>CraftsAndKits.com</span>
          </Link>

          <nav aria-label="Handbook navigation" className="flex items-center gap-4 sm:gap-6 font-semibold">
            <a href="#look-inside" className="hidden sm:inline hover:text-white transition-colors">
              Look Inside
            </a>
            <a href="#whats-inside" className="hidden md:inline hover:text-white transition-colors">
              Modules
            </a>
            <Link href="/deals" className="hover:text-white transition-colors">
              Deals Hub
            </Link>
            {/* Custom Gumroad Overlay Button (no target="_blank" so modal opens in-page) */}
            <a
              href={HANDBOOK_CONFIG.gumroadUrl}
              className="bg-[#C59B43] hover:bg-[#d6ad54] text-[#132238] font-extrabold px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-colors shadow-sm"
            >
              Get PDF ({HANDBOOK_CONFIG.currentPrice})
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#132238] via-[#172A46] to-[#132238] text-white border-b-4 border-[#C59B43]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COPY */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#C59B43]/20 border border-[#C59B43]/60 text-[#F4E8CC] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                {HANDBOOK_CONFIG.promoBadge}
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                One Snapped Wooden Tab Shouldn&apos;t Ruin a $60 Miniature Kit.
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                <strong className="text-[#F4E8CC]">The Miniature Maker&apos;s Rescue Handbook (Illustrated Edition v2)</strong>{' '}
                is the desk-ready field manual by <strong className="text-white">Rashy Michaels</strong>—packed with{' '}
                <strong className="text-white">25 step-by-step workshop fixes</strong>, 6 editorial photos, 8 custom technical diagrams, and printable desk charts for book nook and dollhouse builders.
              </p>

              {/* CTA ROW */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={HANDBOOK_CONFIG.gumroadUrl}
                  className="inline-flex items-center justify-center gap-2 bg-[#C59B43] hover:bg-[#d6ad54] text-[#132238] font-extrabold text-base px-7 py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <span>Get Instant PDF — {HANDBOOK_CONFIG.currentPrice}</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#look-inside"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-base px-6 py-4 rounded-xl transition-colors"
                >
                  <span>Look Inside First ↓</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#F4E8CC]/85">
                {HANDBOOK_CONFIG.promoNote} Instant download via Gumroad checkout.
              </p>

              {/* SPEC STRIP */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
                {[
                  { val: '25', label: 'Numbered Fixes' },
                  { val: '6', label: 'Editorial Photos' },
                  { val: '8', label: 'Custom Diagrams' },
                  { val: '3+', label: 'Printable Charts' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl px-3.5 py-2.5 border border-white/10">
                    <div className="text-xl font-extrabold text-[#C59B43]">{stat.val}</div>
                    <div className="text-xs text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT VISUAL: EMBOSSED COVER MOCKUP OR UPLOADED COVER IMAGE */}
            <div className="lg:col-span-5 flex justify-center">
              {HANDBOOK_CONFIG.coverImagePath ? (
                <div className="relative max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C59B43]">
                  <img
                    src={HANDBOOK_CONFIG.coverImagePath}
                    alt="The Miniature Maker's Rescue Handbook Illustrated Edition v2 cover"
                    className="w-full h-auto block"
                  />
                </div>
              ) : (
                <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-r-2xl rounded-l-md bg-[#0E1B2E] border-2 border-[#C59B43] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] p-7 flex flex-col justify-between overflow-hidden">
                  {/* Spine highlight */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/45 via-white/10 to-transparent" />
                  {/* Subtle inner gold frame */}
                  <div className="absolute inset-3 border border-[#C59B43]/35 rounded-lg pointer-events-none" />

                  <div className="relative text-center space-y-2 pt-2">
                    <p className="text-[10px] font-extrabold tracking-[0.22em] text-[#C59B43] uppercase">
                      CraftsAndKits.com • 2026 v2
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                      The Miniature Maker&apos;s Rescue Handbook
                    </h2>
                    <div className="w-16 h-0.5 bg-[#C59B43] mx-auto my-2" />
                    <p className="text-xs text-[#F4E8CC] italic leading-relaxed">
                      25 Practical Fixes for Book Nooks, Dollhouses &amp; DIY Craft Kits
                    </p>
                  </div>

                  {/* Mini visual centerpiece */}
                  <div className="relative my-4 rounded-xl bg-[#182C4A] border border-[#C59B43]/40 p-4 text-center space-y-2.5">
                    <div className="inline-flex items-center justify-center gap-3 text-[#C59B43]">
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#132238] border border-[#C59B43]/40">
                        1:12 • 1:24 • 1:48
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#132238] border border-[#C59B43]/40">
                        30 AWG LEDs
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-snug">
                      Glue Compatibility Matrix • Wood Splints • Scale Math • Printable 25-Point Checklist
                    </p>
                  </div>

                  <div className="relative text-center pb-1">
                    <p className="font-serif text-sm font-bold tracking-widest text-[#C59B43] uppercase">
                      By Rashy Michaels
                    </p>
                    <p className="text-[10px] text-slate-300 mt-1">
                      Illustrated Edition • Instant Digital PDF
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* SECTION 1: PAIN-POINT STRIP */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C6A1E] mb-2">
              Built for Real Mid-Build Crises
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#132238]">
              Keep It Open Beside Your Cutting Mat
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAIN_POINTS.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-[#D9CEB8] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#8C6A1E] bg-[#F4E8CC] px-2.5 py-1 rounded-md mb-3">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#132238] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5C6672] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: LOOK INSIDE VISUAL PREVIEW */}
        <section
          id="look-inside"
          className="scroll-mt-16 bg-white border-y border-[#D9CEB8] py-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C6A1E] mb-2">
                Look Inside the Illustrated Edition (v2)
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#132238] mb-3">
                Clean Visual Guides You Can Read in Five Seconds
              </h2>
              <p className="text-sm sm:text-base text-[#5C6672]">
                Every table, schematic, and workshop photograph is designed in our high-contrast navy, cream, and gold layout so you never lose your place while glue is drying.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {/* PREVIEW 1: GLUE MATRIX */}
              <div className="rounded-2xl border-2 border-[#C59B43]/60 bg-[#FAF6EE] overflow-hidden shadow-sm">
                <div className="bg-[#132238] px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-wider text-[#F4E8CC] uppercase">
                    Sample Chart • Module 3 (Fix 09)
                  </span>
                  <span className="text-[11px] text-[#C59B43] font-bold">Glue Matrix</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#132238] mb-3">
                    Glue-to-Material Compatibility Matrix
                  </h3>
                  <div className="overflow-hidden rounded-lg border border-[#D9CEB8] text-xs bg-white">
                    <div className="grid grid-cols-3 bg-[#132238] text-white font-bold px-3 py-2">
                      <span>Adhesive</span>
                      <span>Best Surface</span>
                      <span>Watchout</span>
                    </div>
                    <div className="grid grid-cols-3 px-3 py-2 border-t border-[#E6DEC8]">
                      <span className="font-bold text-[#132238]">White PVA</span>
                      <span>Raw wood &amp; card</span>
                      <span>Follow label cure</span>
                    </div>
                    <div className="grid grid-cols-3 px-3 py-2 border-t border-[#E6DEC8] bg-[#FAF6EE]">
                      <span className="font-bold text-[#132238]">Clear Flexible</span>
                      <span>Windows &amp; metal</span>
                      <span>Test scrap first</span>
                    </div>
                    <div className="grid grid-cols-3 px-3 py-2 border-t border-[#E6DEC8]">
                      <span className="font-bold text-[#991B1B]">Super Glue (CA)</span>
                      <span>Tiny pins / resin</span>
                      <span className="text-[#991B1B] font-semibold">Fogs clear plastic</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PREVIEW 2: VERIFIED SCALE DIAGRAM */}
              <div className="rounded-2xl border-2 border-[#C59B43]/60 bg-[#FAF6EE] overflow-hidden shadow-sm">
                <div className="bg-[#132238] px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-wider text-[#F4E8CC] uppercase">
                    Sample Diagram • Module 5 (Fix 19)
                  </span>
                  <span className="text-[11px] text-[#C59B43] font-bold">Scale Math</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#132238] mb-3">
                    Verified 1:12, 1:24 &amp; 1:48 Scale Proportions
                  </h3>
                  <div className="bg-white rounded-lg border border-[#D9CEB8] p-4 flex items-end justify-around gap-3 h-[138px]">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-[#132238] mb-1">1:12 (6.0&quot;)</span>
                      <div className="w-10 h-20 bg-[#D8B589] border-2 border-[#132238] rounded-t-sm flex items-center justify-center">
                        <div className="w-6 h-16 bg-[#F4E8CC] border border-[#9A6F42]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-[#132238] mb-1">1:24 (3.0&quot;)</span>
                      <div className="w-7 h-10 bg-[#D8B589] border-2 border-[#132238] rounded-t-sm flex items-center justify-center">
                        <div className="w-4 h-7 bg-[#F4E8CC] border border-[#9A6F42]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-[#132238] mb-1">1:48 (1.5&quot;)</span>
                      <div className="w-4 h-5 bg-[#D8B589] border-2 border-[#132238] rounded-t-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PREVIEW 3: MICRO-LED CIRCUIT & POLARITY */}
              <div className="rounded-2xl border-2 border-[#C59B43]/60 bg-[#FAF6EE] overflow-hidden shadow-sm">
                <div className="bg-[#132238] px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-wider text-[#F4E8CC] uppercase">
                    Sample Diagram • Module 6 (Fixes 21–24)
                  </span>
                  <span className="text-[11px] text-[#C59B43] font-bold">LED Wiring</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#132238] mb-3">
                    Parallel Kit LED Circuit &amp; Polarity Checks
                  </h3>
                  <div className="bg-white rounded-lg border border-[#D9CEB8] p-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1.5 rounded bg-[#132238] text-[#F4E8CC] font-bold">
                        3V–4.5V / 5V USB
                      </span>
                      <div className="flex-1 h-0.5 bg-[#B83B3B]" />
                      <span className="px-2 py-1 rounded bg-[#F4E8CC] border border-[#132238] font-bold text-[#132238]">
                        SWITCH
                      </span>
                      <div className="flex-1 h-0.5 bg-[#B83B3B]" />
                      <span className="w-7 h-7 rounded-full bg-amber-200 border-2 border-[#C59B43] inline-flex items-center justify-center font-bold text-[#132238]">
                        LED
                      </span>
                    </div>
                    <p className="text-[#5C6672] leading-relaxed">
                      Includes full 6-stage fault isolation (fresh power → spring polarity → switch → JST micro-plug → polarity swap → isolated bulb) plus 30 AWG wire-stripping steps.
                    </p>
                  </div>
                </div>
              </div>

              {/* PREVIEW 4: PRINTABLE DESK CHECKLIST */}
              <div className="rounded-2xl border-2 border-[#C59B43]/60 bg-[#FAF6EE] overflow-hidden shadow-sm">
                <div className="bg-[#132238] px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-wider text-[#F4E8CC] uppercase">
                    Printable Desk Charts • End of Book
                  </span>
                  <span className="text-[11px] text-[#C59B43] font-bold">Print &amp; Tick</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#132238] mb-3">
                    25-Point Pre-Build Checklist &amp; Triage Chart
                  </h3>
                  <ul className="bg-white rounded-lg border border-[#D9CEB8] p-4 space-y-2 text-xs text-[#222831]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#2A6F4E] font-bold">☑</span>
                      <span>Bench-test LED harness out of the bag BEFORE building (Fix 21)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2A6F4E] font-bold">☑</span>
                      <span>Score delicate bridges vertically on mat—never twist (Fix 04)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2A6F4E] font-bold">☑</span>
                      <span>Save empty plywood border frames for gussets &amp; splints (Fix 01)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2A6F4E] font-bold">☑</span>
                      <span>Plus Emergency Triage Table &amp; 15-Term Workshop Glossary</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FULL 6-MODULE CURRICULUM */}
        <section id="whats-inside" className="scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C6A1E] mb-2">
              Complete Table of Contents
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#132238] mb-3">
              All 25 Practical Fixes Across 6 Workshop Modules
            </h2>
            <p className="text-sm sm:text-base text-[#5C6672]">
              Indexed by symptom so you can jump straight to the exact page when a build stalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODULES.map((mod) => (
              <div
                key={mod.num}
                className="bg-white rounded-2xl border border-[#D9CEB8] p-6 shadow-sm hover:border-[#C59B43] transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-[#132238] px-3 py-1 rounded-md">
                    {mod.num} • {mod.fixes}
                  </span>
                  <span className="text-xs font-bold text-[#8C6A1E]">{mod.visuals}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#132238] mb-3">
                  {mod.title}
                </h3>
                <ul className="space-y-2 text-sm text-[#5C6672]">
                  {mod.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-[#C59B43] font-extrabold mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: AUTHOR BIO (REAL BENCH CREDIBILITY) */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-3xl border border-[#D9CEB8] p-7 sm:p-10 shadow-sm flex flex-col md:flex-row items-start gap-7">
            <div className="w-16 h-16 rounded-2xl bg-[#132238] border-2 border-[#C59B43] text-[#C59B43] font-serif text-2xl font-bold flex items-center justify-center flex-shrink-0">
              RM
            </div>
            <div className="space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C6A1E]">
                About the Author
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#132238]">
                Written by Rashy Michaels — Founder of CraftsAndKits.com
              </h2>
              <p className="text-sm sm:text-base text-[#5C6672] leading-relaxed">
                Every technique inside this handbook comes from real workbench time reviewing and assembling miniature houses, book nooks, and mechanical kits—including hands-on builds like the Rolife Polaris Post (DG187), Rolife Sakura Densya (TGB01), MiniCity Beyond Library, ROKR Christmas Cuckoo Clock (LCB01), and head-to-head flush-cut nipper tests.
              </p>
              <div className="pt-1 flex flex-wrap gap-4 text-sm font-bold">
                <Link href="/deals" className="text-[#132238] underline hover:text-[#8C6A1E]">
                  Browse Active Kit Deals →
                </Link>
                <Link href="/" className="text-[#132238] underline hover:text-[#8C6A1E]">
                  Read Hands-On Kit Reviews →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: PRICING & GUMROAD OVERLAY CHECKOUT BOX */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#132238] text-white rounded-3xl border-2 border-[#C59B43] p-8 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="inline-block bg-[#C59B43] text-[#132238] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                  Illustrated Edition (v2) • Instant PDF
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  The Miniature Maker&apos;s Rescue Handbook
                </h2>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>✓ All 25 numbered workshop rescue fixes across 6 modules</li>
                  <li>✓ 6 editorial photographs &amp; 8 custom navy-and-gold diagrams</li>
                  <li>✓ Printable 25-Point Checklist, Glue Matrix, Scale &amp; LED Charts</li>
                  <li>✓ Clean, ad-free PDF formatted for screen viewing &amp; home printing</li>
                </ul>
              </div>

              <div className="md:col-span-5 bg-white/5 border border-[#C59B43]/40 rounded-2xl p-6 text-center space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#F4E8CC] font-bold">
                    Introductory Price
                  </p>
                  <div className="text-4xl font-extrabold text-white mt-1">
                    {HANDBOOK_CONFIG.currentPrice}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Moves to {HANDBOOK_CONFIG.futurePrice} on Dec 2, 2026
                  </p>
                </div>

                {/* Gumroad Overlay Checkout Button */}
                <a
                  href={HANDBOOK_CONFIG.gumroadUrl}
                  className="block w-full bg-[#C59B43] hover:bg-[#d6ad54] text-[#132238] font-extrabold py-4 px-6 rounded-xl text-base shadow-lg transition-transform hover:scale-[1.02]"
                >
                  Buy Now &amp; Download →
                </a>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Secure checkout via Gumroad. Instant digital download—all sales are final and non-refundable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ ACCORDION (PURE HTML DETAILS — ZERO CLIENT JS) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#132238]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-2xl border border-[#D9CEB8] px-6 py-4 shadow-sm"
              >
                <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-bold text-[#132238] text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <span className="text-[#C59B43] text-xl font-bold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[#5C6672] leading-relaxed border-t border-[#F0E9DA] pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* MINIMAL RETURN FOOTER */}
      <footer className="bg-[#132238] text-slate-300 border-t border-[#C59B43]/30 py-8 px-4 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-white">
              © {new Date().getFullYear()} Rashy Michaels • CraftsAndKits.com
            </p>
            <p className="text-xs text-slate-400">
              Independent workshop guide—not affiliated with, sponsored by, or endorsed by Rolife, Robotime, or any kit manufacturer.
            </p>
          </div>
          <div className="flex items-center gap-5 font-semibold">
            <Link href="/" className="hover:text-[#F4E8CC] transition-colors">
              ← CraftsAndKits.com
            </Link>
            <Link href="/deals" className="hover:text-[#F4E8CC] transition-colors">
              Deals Hub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
