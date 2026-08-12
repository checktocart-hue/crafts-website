import { Headphones, Zap, GraduationCap } from "lucide-react";

export default function BuildersResourceWidget() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden font-sans">
      <div className="bg-gray-950 px-4 py-3 border-b border-gray-800">
        <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
          <Zap size={16} className="text-amber-500" />
          Builder Resources
        </h3>
      </div>

      <div className="p-4 flex flex-col gap-4">
        
        {/* BOUNTY 1: Audible Premium Plus ($10 - $25) */}
        <div className="group block border border-gray-100 rounded-lg p-3 bg-gray-50 hover:border-amber-300 hover:bg-amber-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 text-amber-700 p-2 rounded-md shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                Listen While You Build
              </h4>
              <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                Miniature kits take 10+ hours. Keep your hands busy and your mind engaged with audiobooks.
              </p>
              {/* Replace # with your Audible Bounty Link */}
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-amber-700 hover:text-amber-800 uppercase tracking-wide flex items-center gap-1"
              >
                Start Free Audible Trial →
              </a>
            </div>
          </div>
        </div>

        {/* BOUNTY 2: Prime for Young Adults ($30) */}
        <div className="group block border border-gray-100 rounded-lg p-3 bg-gray-50 hover:border-amber-300 hover:bg-amber-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-md shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                Under 24 or in College?
              </h4>
              <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                Don't pay full price for shipping on your tools and kits. Get your supplies delivered in 2 days.
              </p>
              {/* Replace # with your Prime Young Adult Bounty Link */}
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-blue-700 hover:text-blue-800 uppercase tracking-wide flex items-center gap-1"
              >
                Get 6 Months Free →
              </a>
            </div>
          </div>
        </div>

        {/* BOUNTY 3: Amazon Business ($15) */}
        <div className="group block border border-gray-100 rounded-lg p-3 bg-gray-50 hover:border-amber-300 hover:bg-amber-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="bg-gray-200 text-gray-700 p-2 rounded-md shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                For Schools & Labs
              </h4>
              <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                Stocking up on mechanical models for classroom activities? Unlock bulk pricing and tax-exempt purchasing.
              </p>
              {/* Replace # with your Amazon Business Bounty Link */}
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-gray-700 hover:text-gray-900 uppercase tracking-wide flex items-center gap-1"
              >
                Register Free Account →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}