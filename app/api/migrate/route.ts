import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    // Look at your two local folders
    const contentDirs = [
      { path: path.join(process.cwd(), 'content/blog'), collectionName: 'blog' },
      { path: path.join(process.cwd(), 'content/reviews'), collectionName: 'reviews' }
    ];

    const extractedContent = [];

    for (const dir of contentDirs) {
      if (fs.existsSync(dir.path)) {
        const files = fs.readdirSync(dir.path).filter(f => f.endsWith('.mdx'));
        
        for (const file of files) {
          const rawText = fs.readFileSync(path.join(dir.path, file), 'utf-8');
          // gray-matter separates the metadata from the main markdown text
          const { data, content } = matter(rawText); 
          
          extractedContent.push({
            slug: file.replace('.mdx', ''), // Use the filename as the slug
            collectionName: dir.collectionName,
            title: data.title || file.replace('.mdx', ''),
            type: data.type || (dir.collectionName === 'reviews' ? 'Product Review' : 'Blog Post'),
            category: data.category || 'General',
            coverImage: data.coverImage || data.image || '',
            content: content,
            createdAt: data.date || new Date().toISOString(),
          });
        }
      }
    }

    return NextResponse.json({ success: true, extractedContent });
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json({ success: false, error: "Failed to read local files" }, { status: 500 });
  }
}