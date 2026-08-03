import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 1. We tell TypeScript EXACTLY what to expect from our markdown files
export interface PostMeta {
  title: string;
  date: string;
  description?: string;
  image?: string;
  category?: string;
  author?: string;
  slug: string;
  [key: string]: any; // This allows any other random frontmatter fields without breaking
}

const rootDirectory = path.join(process.cwd(), 'content');

// 2. We apply the type to the function return
export const getPostBySlug = (type: 'blog' | 'reviews', slug: string): { meta: PostMeta; content: string } | null => {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(rootDirectory, type, `${realSlug}.mdx`);
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return { 
      // 3. We force the data into our strict PostMeta shape
      meta: { ...(data as any), slug: realSlug } as PostMeta, 
      content 
    };
  } catch (error) {
    console.error(`Error reading ${slug}:`, error);
    return null;
  }
};

export const getAllPosts = (type: 'blog' | 'reviews'): { meta: PostMeta; content: string }[] => {
  try {
    const dirPath = path.join(rootDirectory, type);
    
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const files = fs.readdirSync(dirPath);
    
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => getPostBySlug(type, file))
      // 4. We ensure TypeScript knows we filtered out the nulls
      .filter((post): post is { meta: PostMeta; content: string } => post !== null)
      .sort((a, b) => {
        if (new Date(a.meta.date) < new Date(b.meta.date)) return 1;
        if (new Date(a.meta.date) > new Date(b.meta.date)) return -1;
        return 0;
      });

    return posts;
  } catch (error) {
    console.error(`Error reading ${type} directory:`, error);
    return [];
  }
};