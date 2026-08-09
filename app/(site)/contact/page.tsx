import { Mail, MapPin, Facebook, Instagram, AtSign } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div>
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Have a question about a kit? Want to collaborate? Or just want to show off your latest build? We'd love to hear from you.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-gray-600">hello@craftsandkits.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Location</h3>
                <p className="text-gray-900 font-medium">M O B Global Systems Ltd</p>
                <p className="text-gray-600">Lagos, Nigeria</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <AtSign size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Social Media</h3>
                <p className="text-gray-600 mb-3">Slide into our DMs or tag us in your builds!</p>
                <div className="flex gap-3">
                  <a 
                    href="https://www.instagram.com/crafts.kits" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-600 hover:text-white transition-colors duration-300"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://www.facebook.com/crafts.kits" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@craftsnkits" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
          
          {/* REPLACE 'YOUR_FORMSPREE_ID' WITH YOUR ACTUAL ID */}
          <form 
            action="https://formspree.io/f/YOUR_FORMSPREE_ID" 
            method="POST"
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Name</label>
                 <input 
                   type="text" 
                   name="name" 
                   required
                   className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white" 
                   placeholder="John Doe" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Email</label>
                 <input 
                   type="email" 
                   name="email"
                   required
                   className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white" 
                   placeholder="john@example.com" 
                 />
               </div>
            </div>
            <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Subject</label>
                 <input 
                   type="text" 
                   name="subject"
                   className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white" 
                   placeholder="Regarding a review..." 
                 />
            </div>
            <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Message</label>
                 <textarea 
                   name="message"
                   required
                   rows={5} 
                   className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white resize-none" 
                   placeholder="How can we help?"
                 ></textarea>
            </div>
            <button className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}