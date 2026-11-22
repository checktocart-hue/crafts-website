import type { Metadata } from 'next';
import Link from 'next/link';

// =========================================================================
// 1. AMAZON SITESTRIPE LINKS (PASTE YOUR amzn.to LINKS HERE)
// Leave any link as '' to keep its Amazon button hidden until you add it.
// =========================================================================
const TOOLKIT_LINKS = {
  // --- 9 STARTER MINIATURE TOOLS ---
  cuttingMat: '',
  tweezersSet: '',
  craftKnife11: '',
  flushNippers: 'https://amzn.to/4ieaOsX', // Live: GodHand SPN-120 Ultimate Nipper
  sandingSticks: '',
  steelRuler: '',
  toothpicks: '',
  partsTray: '',
  taskLamp: '',

  // --- SAFE ADHESIVES (MODULE 3 MATRIX) ---
  whitePvaGlue: '',
  tackyGlue: '',
  clearFlexibleGlue: '', // e.g., B-7000 or Beacon 3-in-1
  glueStick: '',
  superGlueGel: '',

  // --- HELPFUL EXTRAS (NOT INCLUDED IN MOST KITS) ---
  aaaBatteries: '',
  usbCCable: '',
  dustingBrush: '',
  acrylicDisplayCase: '',
};

export const metadata: Metadata = {
  title: 'Miniature Starter Toolkit & Glue Guide | CraftsAndKits',
  description:
    "The 9 starter tools and safe glues from The Miniature Maker's Rescue Handbook—tweezers, #11 knives, flush nippers, and non-fogging window adhesives.",
  alternates: {
    canonical: 'https://www.craftsandkits.com/toolkit',
  },
  openGraph: {
    title: "The Miniature Maker's Starter Toolkit & Safe Glue Guide",
    description:
      "Companion workbench guide to The Miniature Maker's Rescue Handbook: 9 essential tools, adhesive compatibility matrix, and kit prep supplies.",
    url: 'https://www.craftsandkits.com/toolkit',
    type: 'website',
  },
};

interface ToolItem {
  num: string;
  name: string;
  fixRef: string;
  role: string;
  buyingTip: string;
  amazonUrl?: string;
  reviewSlug?: string;
}

const STARTER_TOOLS: ToolItem[] = [
  {
    num: '01',
    name: 'Self-Healing Cutting Mat',
    fixRef: 'Module 1 • Fix 04 & 08',
    role: 'Protects your desk, preserves sharp #11 knife tips, and gives you a built-in 90° grid for squaring miniature walls.',
    buyingTip: 'A compact A4 or 9×12 inch dark matte mat provides strong visual contrast against light birch wood and white paper.',
    amazonUrl: TOOLKIT_LINKS.cuttingMat,
  },
  {
    num: '02',
    name: 'Straight & Curved Fine-Point Tweezers',
    fixRef: 'Module 1 • Fixes 01 & 22',
    role: 'Straight tips place tiny books, bottles, and beads; curved tips hold corner gussets and seat micro-JST LED plugs.',
    buyingTip: 'Look for non-magnetic stainless steel with smooth, flush-closing tips rather than serrated jaws that dent soft wood.',
    amazonUrl: TOOLKIT_LINKS.tweezersSet,
  },
  {
    num: '03',
    name: 'Precision #11 Craft Knife (with Spare Blades)',
    fixRef: 'Fix 04, 10 & 23',
    role: 'Scores laser-cut holding bridges straight down on your mat, shaves dried PVA ridges, and gently scores 30 AWG wire sleeves.',
    buyingTip: 'Pick a metal handle with a safety cap and keep extra #11 blades on hand—a fresh blade prevents splintering.',
    amazonUrl: TOOLKIT_LINKS.craftKnife11,
  },
  {
    num: '04',
    name: 'Flush-Cut Hobby Nippers',
    fixRef: 'Module 1 • Clean Part Prep',
    role: 'Snips wooden sprue nibs and plastic runners cleanly on the flat back side without twisting fragile pieces.',
    buyingTip: 'A single-blade flush cutter (like the GodHand SPN-120) leaves dramatically cleaner cuts on tiny trim than standard wire cutters.',
    amazonUrl: TOOLKIT_LINKS.flushNippers,
    reviewSlug: '/blog/godhand-vs-dspiae-the-real-nipper-comparison',
  },
  {
    num: '05',
    name: 'Fine Sanding Sticks (240–400 Grit)',
    fixRef: 'Fixes 05–06 & 16',
    role: 'Removes charred laser nibs flat and trims tight graphite-marked wooden tabs without rounding square corners.',
    buyingTip: 'Rigid slim sticks beat loose sandpaper sheets because they keep narrow 90° wall edges completely flat.',
    amazonUrl: TOOLKIT_LINKS.sandingSticks,
  },
  {
    num: '06',
    name: 'Brushed Steel Millimeter Ruler',
    fixRef: 'Fixes 19–20',
    role: 'Verifies true kit doorway scale (1:12, 1:24, 1:48) and serves as a cut-proof straightedge for scratch-built shelves.',
    buyingTip: 'Choose a short 15 cm (6-inch) stainless ruler with etched millimeter markings starting flush at the zero edge.',
    amazonUrl: TOOLKIT_LINKS.steelRuler,
  },
  {
    num: '07',
    name: 'Wooden Toothpicks & Scrap Cardstock',
    fixRef: 'Fix 11 • Clean Glue Method',
    role: 'Turns any glue bottle into a pinpoint micro-applicator so you transfer 0.5 mm beads instead of flooding seams.',
    buyingTip: 'Plain pointed round birch toothpicks work best—refresh your cardstock glue dot every 10–15 minutes.',
    amazonUrl: TOOLKIT_LINKS.toothpicks,
  },
  {
    num: '08',
    name: 'Clear Lidded Compartment Parts Tray',
    fixRef: 'Fix 01 • Lost-Piece System',
    role: 'Sorts punched wood pieces, beads, hinges, and paper cutouts by manual stage so nothing rolls off the bench.',
    buyingTip: 'A shallow organizer with a snap lid lets you pause mid-project safely without pets or drafts scattering tiny parts.',
    amazonUrl: TOOLKIT_LINKS.partsTray,
  },
  {
    num: '09',
    name: 'Warm Directional Task Lamp',
    fixRef: 'Module 1 • Safe Work Zone',
    role: 'Eliminates hand shadows over the mat so you can read tiny printed part numbers, grain direction, and polarity marks.',
    buyingTip: 'An adjustable-arm LED desk lamp (or clip-on magnifier lamp) reduces eye and neck fatigue during 6-hour builds.',
    amazonUrl: TOOLKIT_LINKS.taskLamp,
  },
];

interface GlueItem {
  name: string;
  fixRef: string;
  bestFor: string;
  caution: string;
  isWarning?: boolean;
  amazonUrl?: string;
}

const SAFE_GLUES: GlueItem[] = [
  {
    name: 'White PVA / Craft Wood Glue',
    fixRef: 'Fix 08, 09 & 15',
    bestFor: 'Raw wood-to-wood frames, corner gussets, rear waste-frame splints, and tissue shims.',
    caution: 'Dries clear with water cleanup while wet. Follow the manufacturer label for grab and full cure times.',
    amazonUrl: TOOLKIT_LINKS.whitePvaGlue,
  },
  {
    name: 'Tacky Craft Glue (Thick PVA)',
    fixRef: 'Fix 09 & 11',
    bestFor: 'Miniature wood furniture, cardstock, fabric edges, and tiny upright props that need thicker grab.',
    caution: 'Lower moisture helps limit paper curling; still apply via toothpick in whisper-thin layers.',
    amazonUrl: TOOLKIT_LINKS.tackyGlue,
  },
  {
    name: 'Clear Flexible Craft Adhesive (e.g., B-7000, Beacon 3-in-1)',
    fixRef: 'Fix 09 & 12',
    bestFor: 'Clear plastic windows, packaging acetate replacements, metal hardware, beads, and mixed materials.',
    caution: 'Does not emit super-glue fogging fumes. Always test one pinpoint dot on a scrap of the same plastic first.',
    amazonUrl: TOOLKIT_LINKS.clearFlexibleGlue,
  },
  {
    name: 'Acid-Free Glue Stick / Paper Adhesive',
    fixRef: 'Fix 13 • Wallpaper',
    bestFor: 'Thin printed wallpaper and paper flooring where liquid glues cause ripples or ink bleed.',
    caution: 'Smooth from the center outward with a card over scrap paper, then press flat under a book.',
    amazonUrl: TOOLKIT_LINKS.glueStick,
  },
  {
    name: 'Cyanoacrylate (CA / Super Glue Gel)',
    fixRef: 'Fix 09 & 15 Caution',
    bestFor: 'Tiny metal wire tips, resin beads, or rapid spot pins far away from clear panels.',
    caution: 'NEVER use near clear plastic windows or acrylic—fumes permanently frost clear panes. Work over parchment or plastic film (not wax paper).',
    isWarning: true,
    amazonUrl: TOOLKIT_LINKS.superGlueGel,
  },
];

const BOX_EXTRAS = [
  {
    name: 'Fresh AAA / AA / CR2032 Batteries',
    note: 'Most kits ship without batteries. Always check your manual voltage (3V–4.5V cells or coin cell) and store coin batteries away from children.',
    amazonUrl: TOOLKIT_LINKS.aaaBatteries,
  },
  {
    name: 'Standard 5V USB-C Cable',
    note: 'Newer Type-C miniature houses (like Rolife DG188/DG189) often require a standard 5V USB-A-to-USB-C cable and wall adapter.',
    amazonUrl: TOOLKIT_LINKS.usbCCable,
  },
  {
    name: 'Soft Dry Watercolor / Makeup Brush',
    note: 'Safest way to lift dust off tiny paper books and glued props without using high-pressure compressed air (Fix 25).',
    amazonUrl: TOOLKIT_LINKS.dustingBrush,
  },
  {
    name: 'Clear Acrylic Dust Display Case',
    note: 'Protects finished book nooks and open room boxes from dust and accidental bumps; wipe with dry microfiber only.',
    amazonUrl: TOOLKIT_LINKS.acrylicDisplayCase,
  },
];

export default function ToolkitPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#222831] flex flex-col">
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

          <nav aria-label="Toolkit navigation" className="flex items-center gap-4 sm:gap-6 font-semibold">
            <a href="#starter-tools" className="hidden sm:inline hover:text-white transition-colors">
              9 Tools
            </a>
            <a href="#safe-glues" className="hidden sm:inline hover:text-white transition-colors">
              Safe Glues
            </a>
            <Link href="/deals" className="hover:text-white transition-colors">
              Deals Hub
            </Link>
            <Link
              href="/handbook"
              className="bg-[#C59B43] hover:bg-[#d6ad54] text-[#132238] font-extrabold px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-colors"
            >
              Rescue Handbook
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="bg-gradient-to-b from-[#132238] via-[#172A46] to-[#132238] text-white border-b-4 border-[#C59B43] py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block bg-[#C59B43]/20 border border-[#C59B43]/60 text-[#F4E8CC] text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full">
            Official Companion Page • The Miniature Maker&apos;s Rescue Handbook
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            The Miniature Maker&apos;s Starter Toolkit &amp; Safe Glue Guide
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every workbench tool and material-matched adhesive referenced in Rashy Michaels&apos;{' '}
            <strong className="text-[#F4E8CC]">Illustrated Rescue Handbook</strong>—kept live right here so your PDF stays clean, ad-free, and up to date.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href="#starter-tools"
              className="bg-[#C59B43] hover:bg-[#d6ad54] text-[#132238] font-extrabold py-3 px-6 rounded-xl text-sm transition-colors"
            >
              Jump to 9 Starter Tools ↓
            </a>
            <a
              href="#safe-glues"
              className="bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
            >
              Jump to Safe Glue Matrix ↓
            </a>
          </div>
        </div>
      </section>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* MANDATORY AMAZON ASSOCIATES DISCLOSURE (ABOVE ALL LINKS) */}
        <aside
          aria-label="Affiliate disclosure"
          className="bg-white border-l-4 border-[#C59B43] border-y border-r border-y-[#D9CEB8] border-r-[#D9CEB8] rounded-r-xl p-4 sm:p-5 text-xs sm:text-sm text-[#5C6672] shadow-sm"
        >
          <strong className="text-[#132238]">Affiliate Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases. Clicking an Amazon button below checks live availability and pricing directly on Amazon at no extra cost to you. Always verify product specifications and read adhesive safety labels before use.
        </aside>

        {/* SECTION 1: THE 9 STARTER MINIATURE TOOLS */}
        <section id="starter-tools" className="scroll-mt-20">
          <div className="mb-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C6A1E] mb-1.5">
              Handbook Module 1 • Essential Bench Setup
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#132238]">
              The 9 Essential Starter Tools
            </h2>
            <p className="text-sm sm:text-base text-[#5C6672] mt-1.5 max-w-3xl">
              You do not need a cluttered workshop. These nine compact tools handle clean laser-bridge cutting, tight-slot sanding, micro-gluing, scale verification, and LED plug seating across book nooks and dollhouses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STARTER_TOOLS.map((tool) => (
              <div
                key={tool.num}
                className="bg-white rounded-2xl border border-[#D9CEB8] p-6 shadow-sm hover:border-[#C59B43] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#132238] text-[#C59B43] font-mono font-extrabold text-xs">
                      {tool.num}
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8C6A1E] bg-[#F4E8CC] px-2.5 py-1 rounded-md">
                      {tool.fixRef}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#132238] leading-snug mb-2">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-[#222831] leading-relaxed mb-3">
                    {tool.role}
                  </p>

                  <p className="text-xs text-[#5C6672] bg-[#FAF6EE] border border-[#E6DEC8] rounded-xl p-3 leading-relaxed mb-4">
                    <strong className="text-[#132238]">Buying Tip:</strong> {tool.buyingTip}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#F0E9DA]">
                  {tool.reviewSlug && (
                    <Link
                      href={tool.reviewSlug}
                      className="block text-xs font-bold text-[#132238] underline hover:text-[#8C6A1E] mb-2"
                    >
                      Read Our Hands-On Bench Test →
                    </Link>
                  )}

                  {tool.amazonUrl ? (
                    <a
                      href={tool.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block w-full text-center bg-orange-400 hover:bg-orange-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
                    >
                      Check Current Options on Amazon ↗
                    </a>
                  ) : (
                    <p className="text-xs text-[#5C6672] italic">
                      Available at most craft shops or via Amazon search.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: SAFE GLUES & ADHESIVE MATRIX */}
        <section id="safe-glues" className="scroll-mt-20">
          <div className="mb-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C6A1E] mb-1.5">
              Handbook Module 3 • Fix 09 Compatibility Matrix
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#132238]">
              Safe Glues by Material (No Fogged Windows)
            </h2>
            <p className="text-sm sm:text-base text-[#5C6672] mt-1.5 max-w-3xl">
              Match your adhesive to the material you are bonding—and always follow the grab time, cure time, and ventilation directions on the manufacturer&apos;s bottle.
            </p>
          </div>

          <div className="space-y-4">
            {SAFE_GLUES.map((glue) => (
              <div
                key={glue.name}
                className={`rounded-2xl p-6 border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
                  glue.isWarning
                    ? 'bg-[#FCEAEA] border-[#B83B3B]/40'
                    : 'bg-white border-[#D9CEB8]'
                }`}
              >
                <div className="space-y-2 lg:max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3
                      className={`font-serif text-lg font-bold ${
                        glue.isWarning ? 'text-[#991B1B]' : 'text-[#132238]'
                      }`}
                    >
                      {glue.name}
                    </h3>
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        glue.isWarning
                          ? 'bg-[#991B1B] text-white'
                          : 'bg-[#F4E8CC] text-[#8C6A1E]'
                      }`}
                    >
                      {glue.fixRef}
                    </span>
                  </div>

                  <p className="text-sm text-[#222831]">
                    <strong className="text-[#132238]">Best For:</strong> {glue.bestFor}
                  </p>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      glue.isWarning ? 'text-[#991B1B] font-semibold' : 'text-[#5C6672]'
                    }`}
                  >
                    <strong>Workshop Note:</strong> {glue.caution}
                  </p>
                </div>

                {glue.amazonUrl && (
                  <div className="flex-shrink-0 lg:w-60">
                    <a
                      href={glue.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block w-full text-center bg-orange-400 hover:bg-orange-500 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm transition-colors"
                    >
                      Check Options on Amazon ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 bg-white rounded-2xl border-l-4 border-[#132238] border-y border-r border-y-[#D9CEB8] border-r-[#D9CEB8] p-5 text-sm text-[#222831]">
            <strong className="text-[#132238]">Clear Window Safety Rule:</strong> Before gluing any clear storefront window or greenhouse pane with a clear flexible craft adhesive, place one pinpoint test dot on a scrap corner of the exact same plastic sheet and wait 10 minutes to verify zero clouding.
          </div>
        </section>

        {/* SECTION 3: OFTEN NOT INCLUDED IN THE KIT BOX */}
        <section aria-labelledby="box-extras-heading">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8C6A1E] mb-1.5">
              Handbook Fixes 02, 21 &amp; 25
            </p>
            <h2
              id="box-extras-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#132238]"
            >
              4 Supplies Often Missing From Kit Boxes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BOX_EXTRAS.map((extra) => (
              <div
                key={extra.name}
                className="bg-white rounded-2xl border border-[#D9CEB8] p-5 shadow-sm flex flex-col justify-between gap-4"
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-[#132238] mb-1.5">
                    {extra.name}
                  </h3>
                  <p className="text-sm text-[#5C6672] leading-relaxed">{extra.note}</p>
                </div>

                {extra.amazonUrl && (
                  <a
                    href={extra.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-block text-center bg-orange-400 hover:bg-orange-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
                  >
                    Check Current Options on Amazon ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CROSS-LINK TO THE RESCUE HANDBOOK & DEALS HUB */}
        <section className="bg-[#132238] text-white rounded-3xl border-2 border-[#C59B43] p-7 sm:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2.5 lg:max-w-2xl">
              <span className="inline-block bg-[#C59B43] text-[#132238] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                Don&apos;t Have the Handbook Yet?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                The Miniature Maker&apos;s Rescue Handbook (Illustrated Edition v2)
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Get all 25 numbered workshop fixes, 6 editorial photos, 8 custom diagrams, and printable desk charts for clean assembly, wood repairs, verified scale math, and micro-LED troubleshooting.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0">
              <Link
                href="/handbook"
                className="text-center bg-[#C59B43] hover:bg-[#d6ad54] text-[#132238] font-extrabold py-3.5 px-7 rounded-xl text-sm sm:text-base transition-colors"
              >
                Look Inside the Handbook →
              </Link>
              <Link
                href="/deals"
                className="text-center bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold py-3 px-7 rounded-xl text-sm transition-colors"
              >
                Browse Live Kit Deals →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* MINIMAL RETURN FOOTER */}
      <footer className="bg-[#132238] text-slate-300 border-t border-[#C59B43]/30 py-8 px-4 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Rashy Michaels • CraftsAndKits.com
          </p>
          <div className="flex items-center gap-5 font-semibold">
            <Link href="/" className="hover:text-[#F4E8CC] transition-colors">
              ← CraftsAndKits.com
            </Link>
            <Link href="/handbook" className="hover:text-[#F4E8CC] transition-colors">
              Rescue Handbook
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
