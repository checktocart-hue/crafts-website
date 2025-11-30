import Header from '@/app/components/Header';
import { Sprout, Mail, Globe, Heart } from 'lucide-react'; // Swapped MapPin for Globe

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* 1. HERO: The Story */}
      <section className="bg-[#F2F0E9] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
            Est. 2025
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-8">
            We believe in the power of <br/>
            <span className="text-primary italic">making things by hand.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            In a world of digital screens, CraftsAndKits is your escape into the physical world. 
            We are dedicated to finding, testing, and reviewing the best miniature kits 
            so you can experience the joy of building.
          </p>
        </div>
      </section>

      {/* 2. OUR MISSION */}
      <section className="py-20 max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="bg-stone-100 rounded-2xl h-[400px] overflow-hidden relative">
           {/* Abstract Image Placeholder */}
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-90"></div>
        </div>
        
        <div>
          <h2 className="text-3xl font-serif text-gray-900 mb-6">Why we started.</h2>
          <div className="space-y-6 text-gray-600">
            <p>
              It started with a single "Book Nook" kit. We realized that the instructions were hard to follow, 
              and it was difficult to know which brands had quality wood versus cheap cardboard.
            </p>
            <p>
              <strong>CraftsAndKits</strong> was born to solve that.
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-primary"><Sprout size={18}/></div>
                <span>We buy and build the kits ourselves.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-primary"><Heart size={18}/></div>
                <span>We only recommend products that last.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. CONTACT INFO (Required for AdSense) */}
      <section className="bg-stone-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-lg mx-auto">
            
            {/* Email Box */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Mail className="text-primary mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-gray-400 text-sm mb-4">For collaborations or kit review requests.</p>
              <a href="mailto:craftsandkits.com@gmail.com" className="text-white hover:text-primary transition font-bold break-all">
                craftsandkits.com@gmail.com
              </a>
            </div>

            {/* Digital Studio Box (Replaces Location) */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <Globe className="text-primary mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Global Studio</h3>
              <p className="text-gray-400 text-sm">
                We are a 100% digital team serving makers worldwide.
                <br/>
                <span className="text-gray-500 mt-2 block">Response time: 24-48 Hours</span>
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}