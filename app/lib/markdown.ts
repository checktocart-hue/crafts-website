import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// This tells Next.js to look for a folder called "content" in the root of your project
const rootDirectory = path.join(process.cwd(), 'content');

export const getPostBySlug = (type: 'blog' | 'reviews', slug: string) => {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(rootDirectory, type, `${realSlug}.mdx`);
    
    // Read the markdown file as a string
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContent);
    
    return { 
      meta: { ...data, slug: realSlug }, 
      content 
    };
  } catch (error) {
    console.error(`Error reading ${slug}:`, error);
    return null;
  }
};

export const getAllPosts = (type: 'blog' | 'reviews') => {
  try {
    const dirPath = path.join(rootDirectory, type);
    
    // If the directory doesn't exist yet, return an empty array
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const files = fs.readdirSync(dirPath);
    
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => getPostBySlug(type, file))
      .filter((post) => post !== null)
      .sort((a, b) => {
        // Sort posts by date (newest first)
        if (new Date(a!.meta.date) < new Date(b!.meta.date)) return 1;
        if (new Date(a!.meta.date) > new Date(b!.meta.date)) return -1;
        return 0;
      });

    return posts;
  } catch (error) {
    console.error(`Error reading ${type} directory:`, error);
    return [];
  }
};