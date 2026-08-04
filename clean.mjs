import fs from 'fs';
import path from 'path';

const folders = ['content/blog', 'content/reviews'];

folders.forEach(folder => {
  const dirPath = path.join(process.cwd(), folder);
  
  // Skip if the folder doesn't exist
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath);
  let fixedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.mdx')) {
      const filePath = path.join(dirPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      const originalContent = content;
      
      // Permanently apply the same fixes our Next.js page was doing on the fly
      content = content
        .replace(/<br>/gi, '<br />')
        .replace(/<hr>/gi, '<hr />')
        .replace(/<!--[\s\S]*?-->/g, '');
        
      // Only overwrite the file if changes were actually made
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
      }
    }
  });
  
  console.log(`✅ Cleaned ${fixedCount} files in ${folder}`);
});