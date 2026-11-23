import Link from "next/link";
import { BookOpen, Wrench, Tag, Headphones, Zap, GraduationCap } from "lucide-react";

// =========================================================================
// 1. SIDEBAR SETTINGS (UPDATE PRICE ON DEC 2 OR ADD REAL BOUNTY LINKS)
// =========================================================================
const SIDEBAR_CONFIG = {
  handbookPrice: "$9.99", // Change to "$14.99" on Dec 2
  handbookBadge: "Illustrated v2 • Instant PDF",
  dealsLabel: "Live Kit Deals & Promo Codes",
};

// Leave any bounty link as "" to keep it hidden until you paste a real URL.
const BOUNTY_LINKS = {
  audible: "",
  primeYoungAdult: "",
  amazonBusiness: "",
};

export default function BuildersResourceWidget() {
  const hasBounties = Boolean(
    BOUNTY_LINKS.audible || BOUNTY_LINKS.primeYoungAdult || BOUNTY_LINKS.amazonBusiness
  );

  return (
    <div className="bg-white border border-[#D9CEB8] rounded-xl shadow-sm overflow-hidden font-sans">
      {/* HEADER BAR */}
      <div className="bg-[#132238] px-4 py-3 border-b-2 border-[#C59B43]">
        <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <Wrench size={15} className="text-[#C59B43]" />
          Builder Resources
        </h3>
      </div>

      <div className="p-4 flex flex-col gap-3.5 bg-[#FAF6EE]/60">
        {/* CARD 1: THE RESCUE HANDBOOK (PRIMARY CONVERSION SPOTLIGHT) */}
        <Link
          href="/handbook"
          className="group block rounded-xl p-4 bg-[#132238] border border-[#C59B43] text-white shadow-sm hover:shadow-md transition-all"
        >
          <span className="inline-block bg-[#C59B43] text-[#132238] text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2">
            {SIDEBAR_CONFIG.handbookBadge}
          </span>
          <div className="flex items-start gap-2.5">
            <div className="bg-white/10 text-[#F4E8CC] p-2 rounded-md shrink-0 mt-0.5">
              <BookOpen size={18} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1 leading-snug group-hover:text-[#F4E8CC] transition-colors">
                The Miniature Maker&apos;s Rescue Handbook
              </h4>
              <p className="text-xs text-slate-200 mb-2.5 leading-relaxed">
                25 step-by-step fixes for snapped tabs, fogged windows, scale math &amp; dark LEDs.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#C59B43] group-hover:text-[#F4E8CC] uppercase tracking-wide">
                Look Inside ({SIDEBAR_CONFIG.handbookPrice}) →
              </span>
            </div>
          </div>
        </Link>

        {/* CARD 2: STARTER TOOLKIT & SAFE GLUES */}
        <Link
          href="/toolkit"
          className="group block border border-[#D9CEB8] rounded-lg p-3 bg-white hover:border-[#C59B43] hover:bg-[#FAF6EE] transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="bg-[#F4E8CC] text-[#8C6A1E] p-2 rounded-md shrink-0">
              <Wrench size={18} />
            </div>
            <div>
              <h4 className="font-bold text-[#132238] text-sm mb-1 leading-tight">
                9-Piece Starter Toolkit &amp; Safe Glues
              </h4>
              <p className="text-xs text-[#5C6672] mb-2 leading-relaxed">
                Exact tweezers, #11 knives, flush nippers &amp; non-fogging window adhesives.
              </p>
              <span className="text-xs font-extrabold text-[#132238] group-hover:text-[#8C6A1E] uppercase tracking-wide inline-flex items-center gap-1">
                View Toolkit Guide →
              </span>
            </div>
          </div>
        </Link>

        {/* CARD 3: EVERGREEN SEASONAL DEALS HUB */}
        <Link
          href="/deals"
          className="group block border border-[#D9CEB8] rounded-lg p-3 bg-white hover:border-[#C59B43] hover:bg-[#FAF6EE] transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 text-blue-700 p-2 rounded-md shrink-0">
              <Tag size={18} />
            </div>
            <div>
              <h4 className="font-bold text-[#132238] text-sm mb-1 leading-tight">
                {SIDEBAR_CONFIG.dealsLabel}
              </h4>
              <p className="text-xs text-[#5C6672] mb-2 leading-relaxed">
                Copy working Rolife codes and compare direct brand savings vs. Amazon Prime.
              </p>
              <span className="text-xs font-extrabold text-blue-700 group-hover:text-blue-800 uppercase tracking-wide inline-flex items-center gap-1">
                Browse Active Deals →
              </span>
            </div>
          </div>
        </Link>

        {/* OPTIONAL AMAZON BOUNTIES (ONLY RENDER WHEN REAL LINKS ARE ADDED) */}
        {hasBounties && (
          <div className="pt-2 border-t border-[#D9CEB8] flex flex-col gap-3">
            {BOUNTY_LINKS.audible && (
              <a
                href={BOUNTY_LINKS.audible}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block border border-gray-200 rounded-lg p-3 bg-white hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 text-amber-700 p-2 rounded-md shrink-0">
                    <Headphones size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                      Listen While You Build
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      Keep your hands busy and your mind engaged with audiobooks during long builds.
                    </p>
                    <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wide">
                      Start Audible Trial ↗
                    </span>
                  </div>
                </div>
              </a>
            )}

            {BOUNTY_LINKS.primeYoungAdult && (
              <a
                href={BOUNTY_LINKS.primeYoungAdult}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block border border-gray-200 rounded-lg p-3 bg-white hover:border-blue-400 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-md shrink-0">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                      Prime for Young Adults
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      Fast shipping on miniature kits, glue, and workbench supplies.
                    </p>
                    <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wide">
                      Check Eligibility ↗
                    </span>
                  </div>
                </div>
              </a>
            )}

            {BOUNTY_LINKS.amazonBusiness && (
              <a
                href={BOUNTY_LINKS.amazonBusiness}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block border border-gray-200 rounded-lg p-3 bg-white hover:border-gray-400 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 text-gray-700 p-2 rounded-md shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                      For Schools &amp; Craft Clubs
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      Stocking up on kits for workshops or classes? Explore bulk business accounts.
                    </p>
                    <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                      Register Free Account ↗
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
