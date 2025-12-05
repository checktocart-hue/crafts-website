export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Affiliate Disclaimer</h1>
      
      <div className="prose prose-lg prose-gray max-w-none bg-yellow-50 p-8 rounded-2xl border border-yellow-100">
        <p className="font-bold text-yellow-900">Transparency is important to us.</p>
        <p>
          CraftsAndKits participates in various affiliate marketing programs, which means we may get paid commissions on editorially chosen products purchased through our links to retailer sites.
        </p>
      </div>

      <div className="prose prose-lg prose-gray max-w-none mt-8">
        <p>
          <strong>Amazon Associate Program</strong><br/>
          CraftsAndKits is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
        <p>
          <strong>How this affects you</strong><br/>
          This comes at <strong>no extra cost to you</strong>. Our reviews remain independent and unbiased. We only recommend kits that we believe are high quality and fun to build.
        </p>
      </div>
    </div>
  );
}