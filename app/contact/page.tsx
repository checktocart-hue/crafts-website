import { Mail, MapPin } from "lucide-react";

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
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                {/* TEMPORARY: Change this to your Gmail until you set up Zoho */}
                <p className="text-gray-600">craftsandkits.com@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Location</h3>
                <p className="text-gray-600">Online / Worldwide</p>
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
                   className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white" 
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