import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      {/* This will automatically display the current date whenever it is built */}
      <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg prose-gray max-w-none">
        <p>At CraftsAndKits, accessible from craftsandkits.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CraftsAndKits and how we use it.</p>
        
        <h3>Log Files</h3>
        <p>CraftsAndKits follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
        
        <h3>Cookies and Web Beacons</h3>
        <p>Like any other website, CraftsAndKits uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        
        <h3>Google and Third-Party Advertising Cookies</h3>
        <p>Google, as a third-party vendor, uses cookies to serve ads on CraftsAndKits. Google's use of advertising cookies enables it and its partners to serve ads to our site visitors based upon their visit to our site and other sites on the Internet.</p>
        
        {/* AdSense Mandatory Opt-Out Links properly formatted as active hyperlinks */}
        <p>
          Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>.
        </p>

        <p>
          Furthermore, CraftsAndKits may use other third-party ad networks to serve advertisements. You can opt out of some third-party vendors' uses of cookies for personalized advertising by visiting <a href="http://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a>.
        </p>

        <h3>Third Party Privacy Policies</h3>
        <p>CraftsAndKits's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>

        <h3>Consent</h3>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
      </div>
    </div>
  );
}