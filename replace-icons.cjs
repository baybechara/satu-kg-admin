const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.jsx')) {
        callback(dirPath);
      }
    }
  });
}

walkDir('./src', function(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Find occurrences of material-symbols-rounded and replace with Icon
  // Example: <span className="material-symbols-rounded text-[24px]">add</span>
  // Example: <span className="material-symbols-rounded">{leftIcon}</span>
  // Regex needs to capture the className and the content
  
  const regex = /<span\s+className=["'](.*?)material-symbols-rounded(.*?)["'](?:\s+style=\{([^}]+)\})?\s*>([\s\S]*?)<\/span>/g;

  let hasChanges = false;
  let newContent = content.replace(regex, (match, beforeClass, afterClass, styleAttr, innerContent) => {
    hasChanges = true;
    let className = `${beforeClass} ${afterClass}`.replace(/\s+/g, ' ').trim();
    innerContent = innerContent.trim();
    
    // If innerContent is a string literal (e.g., 'add', 'close')
    if (/^[a-z0-9_]+$/.test(innerContent)) {
       return `<Icon name="${innerContent}" className="${className}" ${styleAttr ? `style={${styleAttr}}` : ''} />`;
    } 
    // If innerContent is an expression like {leftIcon} or {item.icon}
    else if (innerContent.startsWith('{') && innerContent.endsWith('}')) {
       let expr = innerContent.slice(1, -1);
       return `<Icon name={${expr}} className="${className}" ${styleAttr ? `style={${styleAttr}}` : ''} />`;
    }
    
    return match; // fallback
  });

  if (hasChanges) {
    // Add import statement if not exists
    if (!newContent.includes("import Icon from")) {
      // Calculate relative path to components/Icon.jsx
      let relativePath = path.relative(path.dirname(filePath), path.resolve('./src/components/Icon.jsx')).replace(/\\/g, '/');
      if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
      
      // Insert import at the top
      newContent = `import Icon from '${relativePath}'\n` + newContent;
    }
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
});
