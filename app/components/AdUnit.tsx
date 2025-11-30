export default function AdUnit({ format = "horizontal" }: { format?: "horizontal" | "vertical" | "square" }) {
  // Define sizes based on format
  const classes = {
    horizontal: "w-full h-[90px] md:h-[250px]", // Leaderboard
    vertical: "w-full h-[600px]",              // Sidebar Skyscraper
    square: "w-full h-[250px]",                 // Content Square
  };

  return (
    <div className={`bg-gray-100 border border-gray-200 flex flex-col items-center justify-center my-8 mx-auto relative overflow-hidden ${classes[format]}`}>
      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans absolute top-2 left-1/2 -translate-x-1/2">
        Advertisement
      </span>
      {/* Visual cue that this is an AdSense slot */}
      <div className="text-gray-300 font-bold text-xl font-sans">
        Google AdSense {format}
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
    </div>
  );
}