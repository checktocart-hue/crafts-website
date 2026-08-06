export const dynamic = 'force-dynamic'; // This line disables the cache

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; 

export async function GET() {
  try {
    // Change this to "blog" or "posts" depending on your Firebase setup
    const snapshot = await getDocs(collection(db, "blog"));
    
    let csvContent = 'title,category,imageUrl,bodyText,slug\n';
    const escapeCSV = (str: any) => `"${String(str || '').replace(/"/g, '""')}"`;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const title = escapeCSV(data.title);
      const category = escapeCSV(data.category);
      const imageUrl = escapeCSV(data.image);
      const bodyText = escapeCSV(data.content);
      const slug = escapeCSV(doc.id);

      csvContent += `${title},${category},${imageUrl},${bodyText},${slug}\n`;
    });

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="firebase_blog_export.csv"',
      },
    });
  } catch (error) {
    return new Response("Error exporting data", { status: 500 });
  }
}