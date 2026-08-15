import React from 'react';

// Swap this with your actual Amazon Prime Young Adult Bounty Link
const BOUNTY_LINK = "https://amzn.to/4wum3kL";

export const metadata = {
  title: 'Unlock 6 Months Free | Prime for Young Adults',
  description: 'Stop paying for shipping and streaming. Claim your 6-month free trial of Amazon Prime for 18-24 year olds.',
  robots: 'noindex, nofollow', // Hides the page from Google so it's strictly for your ad/social funnel
};

export default function YoungAdultLandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* SECTION 1: THE HERO (Dark & Aggressive) */}
      <section className="relative px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Stop Paying for Netflix <br className="hidden md:block" /> 
            <span className="text-amber-500">and Shipping.</span>
            <br className="hidden md:block" />
            <span className="text-3xl md:text-5xl text-zinc-400 mt-4 block">(If You’re 18-24)</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Amazon is currently handing out 6-month free passes to Prime for Young Adults. That means free Prime Video, ad-free Music, and 2-day shipping for half a year at <strong className="text-white">$0.00</strong>.
          </p>

          <div className="pt-8">
            <a 
              href={BOUNTY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-black font-black text-lg md:text-xl py-5 px-10 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all hover:scale-105 uppercase tracking-widest"
            >
              👉 Claim My 6 Months Free ↗
            </a>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mt-4">
              Zero commitment. Cancel anytime before 6 months & pay nothing.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE AGITATION (Clean & Readable) */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-6">
            The math on being in your 20s right now is brutal.
          </h2>
          <div className="space-y-6 text-lg text-zinc-600 font-medium leading-relaxed">
            <p>
              You’re already paying for rent, gas, and groceries. But you're probably also leaking $15 a month on streaming services, and taking a $7 hit on shipping every time you need something delivered.
            </p>
            <p className="font-bold text-zinc-900 border-l-4 border-amber-500 pl-4">
              It is a completely unnecessary tax.
            </p>
            <p>
              If you are 18 to 24 years old, Amazon has a hidden tier called <strong>Prime for Young Adults</strong>. You don't need a <code className="bg-zinc-100 text-red-500 px-1.5 py-0.5 rounded text-sm">.edu</code> college email address to get it. You just have to be under 25.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE BENEFITS GRID */}
      <section className="bg-zinc-50 px-6 py-20 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center text-zinc-900 mb-12">
            What unlocks the second you start the trial:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Unlimited Fast Delivery</h3>
              <p className="text-zinc-600">Stop waiting a week or paying $8 just to get toothpaste, phone chargers, or dorm supplies delivered.</p>
            </div>
            
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Full Prime Video</h3>
              <p className="text-zinc-600">Drop your other streaming bills. You get <em>The Boys</em>, <em>Fallout</em>, and thousands of movies instantly.</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Ad-Free Amazon Music</h3>
              <p className="text-zinc-600">Access 100 million songs and the top podcasts, completely ad-free.</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">5% Cash Back</h3>
              <p className="text-zinc-600">Earn actual cash back on categories like travel, electronics, and personal care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE TRANSPARENCY CLOSE */}
      <section className="bg-white px-6 py-20 pb-32">
        <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 p-8 md:p-12 rounded-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-4">
            What is the catch?
          </h2>
          <p className="text-lg text-zinc-700 mb-6 font-medium leading-relaxed max-w-xl mx-auto">
            There isn't one, but we believe in being 100% transparent. This is a <strong>6-month free trial</strong>. For the next 180 days, you pay $0.00. 
          </p>
          <p className="text-lg text-zinc-700 mb-10 font-medium leading-relaxed max-w-xl mx-auto">
            After 6 months, if you decide to keep it, it auto-renews at roughly half the price of standard Prime ($7.49/mo). But if you just want the free pass, <strong>set a calendar reminder on your phone right now</strong> to cancel in 5 months and 29 days. You walk away having paid absolutely nothing.
          </p>
          
          <a 
            href={BOUNTY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full md:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-black text-lg py-5 px-10 rounded-xl shadow-lg transition-transform hover:scale-105 uppercase tracking-widest"
          >
            👉 Start My $0.00 Trial Now ↗
          </a>
        </div>
      </section>

    </main>
  );
}