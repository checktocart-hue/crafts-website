import Header from '@/app/components/Header';
import { Mail, MessageSquare, HelpCircle, Clock } from 'lucide-react';
import AdUnit from '@/app/components/AdUnit';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="bg-primary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-green-100 max-w-xl mx-auto text-lg">
          Have a question about a kit? Want to request a review? 
          We are here to help you build your world.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 text-center">
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 rounded-full mb-6 text-primary">
            <Mail size={32} />
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Email Support</h2>
          <p className="text-gray-500 mb-6">
            We are a digital-first team. The best way to reach us is via email.
            <br/>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mt-2 block">
              <Clock size={10} className="inline mr-1"/> Response time: 24 Hours
            </span>
          </p>

          <a 
            href="mailto:craftsandkits.com@gmail.com" 
            className="text-2xl md:text-3xl font-bold text-primary hover:text-green-700 transition break-all border-b-2 border-primary/20 hover:border-primary"
          >
            craftsandkits.com@gmail.com
          </a>

        </div>
      </div>

      {/* 2. FAQ SECTION (Adds value for Google) */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-100">
            <div className="flex gap-4">
              <HelpCircle className="text-secondary shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Do you sell these kits directly?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No. We are an independent review site. We buy, build, and test the kits, then provide links to trusted retailers like Amazon where you can purchase them safely.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-100">
            <div className="flex gap-4">
              <MessageSquare className="text-secondary shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Can I request a specific kit review?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Absolutely! If there is a new Book Nook or Miniature House you want us to test before you buy, send us an email. We add requests to our build queue every Monday.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-100">
            <div className="flex gap-4">
              <Mail className="text-secondary shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Are you accepting guest posts?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We are currently looking for experienced miniature builders who want to share their painting and assembly tips. Email us with your portfolio!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AD SLOT */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <AdUnit format="horizontal" />
      </div>

    </main>
  );
}