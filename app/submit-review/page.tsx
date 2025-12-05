export default function SubmitReviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Submit a Kit for Review</h1>
        <p className="text-gray-600">
          Are you a creator or brand? Send us your kit and our team will build it, review it, and share it with our community.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-sm font-bold text-gray-700">Brand Name</label>
               <input type="text" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-bold text-gray-700">Contact Email</label>
               <input type="email" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" />
             </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700">Product URL / Website</label>
             <input type="url" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="https://..." />
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700">Tell us about the kit</label>
             <textarea rows={4} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="What makes this kit special?"></textarea>
          </div>

          <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-green-800 transition shadow-lg">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}