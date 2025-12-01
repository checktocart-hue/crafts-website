import Header from '@/app/components/Header';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold mb-8">Terms and Conditions</h1>
        <div className="prose prose-stone max-w-none text-gray-600">
          <p><strong>Last Updated: November 2025</strong></p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using CraftsAndKits, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h3>2. Use License</h3>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on CraftsAndKits's website for personal, non-commercial transitory viewing only.</p>

          <h3>3. Disclaimer</h3>
          <p>The materials on CraftsAndKits's website are provided on an 'as is' basis. CraftsAndKits makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h3>4. Limitations</h3>
          <p>In no event shall CraftsAndKits or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CraftsAndKits's website.</p>
        </div>
      </div>
    </main>
  );
}