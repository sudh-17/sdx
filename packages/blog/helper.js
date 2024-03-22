const fs = require('fs');  
const path = require('path');  
  
function buildDirectoryTree(dirPath, tree = []) {  
  const files = fs.readdirSync(dirPath);  
  
  files.forEach((file) => {  
    const fullPath = path.join(dirPath, file);  
    const stats = fs.statSync(fullPath);  
  
    if (stats.isDirectory()) {  
      // 如果是目录，递归处理子目录  
      const children = buildDirectoryTree(fullPath, []);  
      // 将子目录数组添加到当前目录的 items 属性中  
      tree.push({ name: file, type: 'directory', items: children });  
    } else {  
      // 如果是文件，添加到当前目录的 items 属性中  
      tree.push({ name: file, type: 'file' });  
    }  
  });  
  
  return tree;  
}  
  
// 从根目录开始构建目录树  
const rootDir = path.join(__dirname, 'docs'); // 假设 docs 是你的根目录  
const directoryTree = buildDirectoryTree(rootDir);  
  
// 将生成的目录树结构写入 tree.json 文件中  
fs.writeFileSync(path.join(__dirname, 'tree.json'), JSON.stringify(directoryTree, null, 2));  
  
console.log('Directory tree has been saved to tree.json');