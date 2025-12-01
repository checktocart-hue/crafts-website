import Header from '@/app/components/Header';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-stone max-w-none text-gray-600">
          <p><strong>Last Updated: November 2025</strong></p>
          
          <h3>1. Introduction</h3>
          <p>Welcome to CraftsAndKits. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>

          <h3>2. Data We Collect</h3>
          <p>We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together follows:</p>
          <ul>
            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location, and operating system.</li>
            <li><strong>Usage Data:</strong> Includes information about how you use our website and services.</li>
            <li><strong>Cookies:</strong> We use cookies to analyze traffic and for ad personalization (Google AdSense).</li>
          </ul>

          <h3>3. Google AdSense & Cookies</h3>
          <p>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
          <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow">Ads Settings</a>.</p>

          <h3>4. Contact Us</h3>
          <p>If you have any questions about this privacy policy, please contact us at: <strong>craftsandkits.com@gmail.com</strong></p>
        </div>
      </div>
    </main>
  );
}