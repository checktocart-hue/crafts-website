import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import https from 'https';
import toMarkdown from '@sanity/block-content-to-markdown';

// 1. Connect to your Sanity Database
const client = createClient({
  projectId: 'nrmr5169', 
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function runMigration() {
  console.log("🚀 Starting Sanity to Markdown Migration...");

  // 2. Ensure your local folders exist
  const directories = ['content/blog', 'content/reviews', 'public/images/migrated'];
  directories.forEach(dir => fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true }));

  // 3. Query all posts, reviews, and projects
  const query = `*[_type in ["post", "review", "project"]] {
    _type,
    title,
    "slug": slug.current,
    _createdAt,
    "imageUrl": mainImage.asset->url,
    "category": categories[0]->title,
    body
  }`;

  const documents = await client.fetch(query);
  console.log(`Found ${documents.length} articles to migrate. Downloading...\n`);

  // 4. Loop through each article
  for (const doc of documents) {
    if (!doc.slug) continue;

    let imagePath = '';
    
    // 5. Download the Main Image
    if (doc.imageUrl) {
      const extension = doc.imageUrl.split('.').pop() || 'jpg';
      const fileName = `${doc.slug}.${extension}`;
      imagePath = `/images/migrated/${fileName}`;
      const localPath = path.join(process.cwd(), 'public', 'images', 'migrated', fileName);
      
      await new Promise((resolve, reject) => {
        https.get(doc.imageUrl, (res) => {
          res.pipe(fs.createWriteStream(localPath))
             .on('finish', resolve)
             .on('error', reject);
        });
      });
    }

    // NEW: Scrub the body content to remove broken/empty image blocks before converting
    let cleanBody = [];
    if (doc.body && Array.isArray(doc.body)) {
      cleanBody = doc.body.filter(block => {
        // If it's an image block but has no uploaded asset, throw it in the trash
        if (block._type === 'image' && !block.asset) {
          return false; 
        }
        return true;
      });
    }

    // 6. Convert Sanity blocks to standard Markdown
    const bodyContent = cleanBody.length > 0 ? toMarkdown(cleanBody, { 
      projectId: 'nrmr5169', 
      dataset: 'production',
      serializers: {
        types: {
          table: (props) => {
            if (!props.node || !props.node.rows) return '';
            let mdTable = '\n';
            props.node.rows.forEach((row, index) => {
              const cells = row.cells.map(cell => cell || ' ').join(' | ');
              mdTable += `| ${cells} |\n`;
              if (index === 0) {
                const divider = row.cells.map(() => '---').join(' | ');
                mdTable += `| ${divider} |\n`;
              }
            });
            return mdTable + '\n';
          },
          comparisonTable: (props) => {
            if (!props.node || !props.node.rows) return '\n<!-- Comparison Table omitted during migration -->\n';
            let mdTable = '\n';
            props.node.rows.forEach((row, index) => {
              const cells = row.cells.map(cell => cell || ' ').join(' | ');
              mdTable += `| ${cells} |\n`;
              if (index === 0) {
                const divider = row.cells.map(() => '---').join(' | ');
                mdTable += `| ${divider} |\n`;
              }
            });
            return mdTable + '\n';
          }
        },
        unknownType: (props) => {
          return `\n<!-- Notice: Skipped custom Sanity block type: ${props.node._type} -->\n`;
        }
      }
    }) : '';

    // 7. Build the MDX File layout
    const mdxTemplate = `---
title: "${doc.title ? doc.title.replace(/"/g, '\\"') : 'Untitled'}"
date: "${doc._createdAt ? new Date(doc._createdAt).toISOString().split('T')[0] : '2026-08-02'}"
image: "${imagePath}"
category: "${doc.category || 'General'}"
---

${bodyContent}
`;

    // 8. Save the file to the correct folder
    const folder = doc._type === 'review' ? 'content/reviews' : 'content/blog';
    fs.writeFileSync(path.join(process.cwd(), folder, `${doc.slug}.mdx`), mdxTemplate);
    
    console.log(`✅ Successfully migrated: ${doc.title}`);
  }

  console.log("\n🎉 Migration Complete! All files and images are now local.");
}

runMigration();