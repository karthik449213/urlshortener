const fs = require('fs');
const path = require('path');

// Ensure dist directory exists (it should already have your files)
if (!fs.existsSync('dist')) {
  console.log('Warning: dist directory not found!');
  process.exit(1);
}

// Ensure urls.json exists in root directory for functions to access
const urlsJsonPath = path.join(__dirname, 'urls.json');
if (!fs.existsSync(urlsJsonPath)) {
  fs.writeFileSync(urlsJsonPath, '{}');
  console.log('Created empty urls.json in root.');
}

console.log('Build completed successfully!');
console.log('Project is ready for Netlify deployment.');
console.log('Files available in dist/ directory:');
console.log('- dist/index.html');
console.log('- dist/css/style.css');
console.log('- dist/js/script.js');
console.log('- urls.json (in root for functions)');

