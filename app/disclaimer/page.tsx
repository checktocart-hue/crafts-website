import Header from '@/app/components/Header';

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold mb-8">Affiliate Disclaimer</h1>
        <div className="prose prose-stone max-w-none text-gray-600">
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
            <p className="font-bold text-gray-900">The Short Version:</p>
            <p>Some of the links on this website are affiliate links. This means if you click on the link and purchase the item, we may receive a small commission at no extra cost to you.</p>
          </div>

          <h3>Amazon Associates Program</h3>
          <p><strong>CraftsAndKits is a participant in the Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
          <p>As an Amazon Associate, we earn from qualifying purchases.</p>

          <h3>How We Review Products</h3>
          <p>Our reviews are based on our own research, testing, and analysis. We are not paid by brands to write positive reviews. If a kit has poor instructions or bad materials, we will tell you.</p>
          
          <h3>Liability</h3>
          <p>While we strive to provide accurate information, product prices and availability are subject to change. Always check the final price on the retailer's site.</p>
        </div>
      </div>
    </main>
  );
}