const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked'); // NEW: Imports the HTML converter

const mdxFolders = [
  'C:\\Users\\M O B\\crafts-and-kits\\content\\blog'
];

const outputFile = 'wordpress_import.xml';

let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<posts>\n';
let totalFiles = 0;

mdxFolders.forEach(folder => {
  if (!fs.existsSync(folder)) return;

  const files = fs.readdirSync(folder).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
  
  files.forEach(file => {
    const fullPath = path.join(folder, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const title = data.title || '';
    const category = data.category || ''; 
    let imageUrl = data.image || data.imageUrl || data.coverImage || ''; 
    
    if (imageUrl.includes('migrated')) {
      imageUrl = path.basename(imageUrl);
    }

    // NEW: Converts your raw Markdown into perfect WordPress-ready HTML
    const htmlBody = marked.parse(content.trim());

    xmlContent += `  <post>\n`;
    xmlContent += `    <title><![CDATA[${title}]]></title>\n`;
    xmlContent += `    <category><![CDATA[${category}]]></category>\n`;
    xmlContent += `    <imageUrl><![CDATA[${imageUrl}]]></imageUrl>\n`;
    xmlContent += `    <bodyText><![CDATA[${htmlBody}]]></bodyText>\n`;
    xmlContent += `  </post>\n`;
    
    totalFiles++;
  });
});

xmlContent += '</posts>';
fs.writeFileSync(outputFile, xmlContent);
console.log(`Success! Converted ${totalFiles} MDX files into HTML and saved as ${outputFile}`);