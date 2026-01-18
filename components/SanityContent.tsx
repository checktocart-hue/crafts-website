import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { client } from "../sanity/sanityclient";

// 1. Helper to get image URLs
const builder = urlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// 2. The Components Config (THIS FIXES YOUR ISSUE)
const myPortableTextComponents = {
  types: {
    // FIX IMAGES
    image: ({ value }: any) => {
      return (
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || "Post image"}
          style={{ maxWidth: "100%", height: "auto", margin: "20px 0", borderRadius: "8px" }}
        />
      );
    },
    // FIX TABLES
    table: ({ value }: any) => {
      return (
        <div style={{ overflowX: "auto", margin: "20px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
            <tbody>
              {value.rows.map((row: any, rIndex: number) => (
                <tr key={rIndex} style={{ background: rIndex === 0 ? "#f4f4f4" : "white" }}>
                  {row.cells.map((cell: string, cIndex: number) => (
                    <td
                      key={cIndex}
                      style={{ padding: "10px", border: "1px solid #ddd", fontWeight: rIndex === 0 ? "bold" : "normal" }}
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
    },
  },
};

// 3. The Actual Component you use in your pages
export default function SanityContent({ content }: { content: any }) {
  return <PortableText value={content} components={myPortableTextComponents} />;
}