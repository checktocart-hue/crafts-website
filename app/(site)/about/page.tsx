import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="text-primary font-bold tracking-widest text-xs uppercase bg-green-50 px-3 py-1 rounded-full text-green-800">
          Behind the Builds
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-gray-900">About CraftsAndKits</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We don't just review kits. We build them.
        </p>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg mx-auto text-gray-600">
        <p className="lead text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
          Hi, I'm <span className="font-bold text-green-700">Rashy Michaels</span>, the founder of CraftsAndKits.
        </p>
        <p>
          If you are here, you probably know the struggle: You buy a cool-looking metal model or a DIY book nook online, only to open the box and find confusing instructions, brittle parts, or a kit that looks nothing like the photo.
        </p>
        <p>
          I started CraftsAndKits in 2024 because I was tired of guessing. I realized the hobby community needed a resource that was honest, detailed, and actually helpful—written by people who have glue on their fingers.
        </p>

        <h3 className="text-gray-900 font-bold mt-12 text-2xl">Our Philosophy: "Build Before We Review"</h3>
        <p>
          Unlike generic review sites that just list Amazon specs, we get our hands dirty. We believe that you can't recommend a pair of nippers, a paint set, or a complex model kit unless you've actually used them to finish a project.
        </p>
        <ul>
          <li>We stress-test tabs on metal models.</li>
          <li>We check if paints flow correctly.</li>
          <li>We translate confusing instructions into plain English.</li>
        </ul>

        {/* Bio & Image Section */}
        <div className="mt-16 mb-12 p-8 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col md:flex-row items-center gap-8 not-prose shadow-sm">
         <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
            {/* Ensure rashy-about.png is inside your /public folder */}
            <Image 
              src="/rashy-about.jpg"
              alt="Rashy Michaels painting miniatures at her workbench"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-2xl mb-4 mt-0">Meet the Builder</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              I'm a passionate miniature enthusiast and builder. My obsession started years ago and has grown into a workshop full of paints, glues, and half-finished projects across Book Nooks, metal models, and miniature painting. When I'm not building, I'm writing these guides to help you create your own miniature worlds without the frustration.
            </p>
            <div className="flex items-center gap-2 text-green-800 font-medium bg-green-50 inline-block px-4 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
              <a href="mailto:craftsandkits.com@gmail.com" className="hover:underline">craftsandkits.com@gmail.com</a>
            </div>
          </div>
        </div>
        
        <h3 className="text-gray-900 font-bold mt-8">Our Mission</h3>
        <p>
          To help hobbyists of all skill levels discover their next favorite project without the guesswork. We believe that building with your hands provides a necessary escape from the digital world, fostering patience, focus, and creativity.
        </p>
      </div>
    </div>
  );
}