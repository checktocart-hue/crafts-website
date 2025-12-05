export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg prose-gray max-w-none">
        <p>At CraftsAndKits, accessible from craftsandkits.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CraftsAndKits and how we use it.</p>
        
        <h3>Log Files</h3>
        <p>CraftsAndKits follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
        
        <h3>Cookies and Web Beacons</h3>
        <p>Like any other website, CraftsAndKits uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        
        <h3>Google DoubleClick DART Cookie</h3>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>

        <h3>Third Party Privacy Policies</h3>
        <p>CraftsAndKits's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>

        <h3>Consent</h3>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
      </div>
    </div>
  );
}