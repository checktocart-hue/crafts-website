import { PortableText } from '@portabletext/react';
import { urlFor } from '@/app/lib/sanity'; // Helper for images if needed later

// 1. Define how to render the Table
const TableComponent = ({ value }: { value: any }) => {
  return (
    <div className="my-8 overflow-x-auto shadow-sm rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {value.rows.map((row: any, i: number) => (
            <tr key={i} className={i === 0 ? "bg-stone-100" : "hover:bg-gray-50"}>
              {row.cells.map((cell: string, j: number) => (
                <td 
                  key={j} 
                  className={`px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap ${i === 0 ? "font-bold text-gray-900 uppercase tracking-wider" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 2. Define the Components Map
const components = {
  types: {
    table: TableComponent, // Connects 'table' from Sanity to our code above
    image: ({ value }: any) => {
        // Basic Image handling
        return (
            <figure className="my-8">
                {/* We use a simple img tag here for simplicity, ideally use next/image */}
                <img 
                    src={value.asset?._ref ? `https://cdn.sanity.io/images/nrmr5169/production/${value.asset._ref.replace('image-', '').replace('-png', '.png').replace('-jpg', '.jpg')}` : ''} 
                    alt={value.alt || 'Article Image'}
                    className="rounded-xl w-full object-cover"
                />
                {value.caption && <figcaption className="text-center text-gray-500 text-sm mt-2">{value.caption}</figcaption>}
            </figure>
        )
    }
  },
  block: {
      // Style headings automatically
      h2: ({children}: any) => <h2 className="text-3xl font-serif font-bold mt-10 mb-4 text-gray-900">{children}</h2>,
      h3: ({children}: any) => <h3 className="text-2xl font-serif font-bold mt-8 mb-3 text-gray-900">{children}</h3>,
      blockquote: ({children}: any) => <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-6 bg-stone-50 p-4 rounded-r-lg">{children}</blockquote>,
  },
  marks: {
      // Style links to look clickable
      link: ({children, value}: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-primary underline font-bold hover:text-green-700">
            {children}
          </a>
        )
      },
  }
};

// 3. Export the Component
export default function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}