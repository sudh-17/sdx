const fs = require('fs');  
const path = require('path');  
  
function buildMarkdownTree(dirPath, tree = []) {  
  const files = fs.readdirSync(dirPath);  
  
  files.forEach((file) => {  
    const fullPath = path.join(dirPath, file);  
    const stats = fs.statSync(fullPath);  
  
    if (stats.isDirectory()) {  
      // 如果是目录，递归处理  
      buildMarkdownTree(fullPath, tree);  
    } else if (path.extname(file) === '.md') {  
      // 如果是 Markdown 文件，添加到树中  
      const fileName = path.basename(file, '.md');  
      const parentDir = path.dirname(fullPath).replace(process.cwd() + '/docs', '');  
  
      let branch = tree.find(item => item.text === parentDir);  
      if (!branch) {  
        // 如果父目录不存在，则添加它  
        branch = { text: parentDir, items: [] };  
        tree.push(branch);  
      }  
  
      if (!branch.items.find(item => item.text === fileName)) {  
        // 如果文件不在子目录中，则添加它  
        branch.items.push({ text: fileName, link: fullPath });  
      }  
    }  
  });  
  
  return tree;  
}  
  
// 使用函数，从 docs 目录开始构建树  
const markdownTree = buildMarkdownTree(path.join(__dirname, 'docs'));  
console.log(markdownTree);