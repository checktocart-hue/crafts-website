import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <span className="text-primary font-bold tracking-widest text-xs uppercase bg-green-50 px-3 py-1 rounded-full">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">About CraftsAndKits</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are a community of makers, builders, and dreamers dedicated to the art of miniatures.
        </p>
      </div>

      <div className="prose prose-lg mx-auto text-gray-600">
        <p>
          Welcome to CraftsAndKits, your number one source for all things miniature. We're dedicated to giving you the very best of DIY kits, with a focus on quality, intricacy, and the joy of building.
        </p>
        <p>
          Founded in 2024, CraftsAndKits has come a long way from its beginnings in Lagos. When we first started out, our passion for "building magical worlds" drove us to do tons of research on Book Nooks and 3D metal puzzles so that CraftsAndKits can offer you the world's most comprehensive building guides and reviews.
        </p>
        <p>
          We now serve customers and readers all over the world and are thrilled that we're able to turn our passion into our own website.
        </p>
        
        <h3 className="text-gray-900 font-bold mt-8">Our Mission</h3>
        <p>
          To help hobbyists of all skill levels discover their next favorite project. We believe that building with your hands provides a necessary escape from the digital world, fostering patience, focus, and creativity.
        </p>
      </div>
    </div>
  );
}