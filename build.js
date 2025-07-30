const fs = require('fs');
const path = require('path');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Create static directories in dist
if (!fs.existsSync('dist/css')) {
  fs.mkdirSync('dist/css', { recursive: true });
}
if (!fs.existsSync('dist/js')) {
  fs.mkdirSync('dist/js', { recursive: true });
}

// Copy HTML file to dist
let htmlContent = fs.readFileSync('templates/index.html', 'utf8');

// Replace Flask template syntax with direct paths
htmlContent = htmlContent.replace(
  /{{ url_for\('static', filename='css\/style\.css'\) }}/g,
  'css/style.css'
);
htmlContent = htmlContent.replace(
  /{{ url_for\('static', filename='js\/script\.js'\) }}/g,
  'js/script.js'
);

fs.writeFileSync('dist/index.html', htmlContent);

// Copy CSS and JS files
fs.copyFileSync('static/css/style.css', 'dist/css/style.css');
fs.copyFileSync('static/js/script.js', 'dist/js/script.js');

console.log('Build completed successfully!');
console.log('Files copied to dist/ directory');
console.log('- dist/index.html');
console.log('- dist/css/style.css');
console.log('- dist/js/script.js');

