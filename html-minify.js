const fs = require('fs');
const FILE_PATH = './src/index.html';
const DESTINATION_PATH = './public/index.html';
const minify = require('html-minifier').minify;

console.log('[html-minify] reading file');
let fileData = fs.readFileSync(FILE_PATH, 'utf8');

console.log('[html-minify] minify');
fileData = minify(fileData, {
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
});

console.log('[html-minify] write file', DESTINATION_PATH);
fs.writeFileSync(DESTINATION_PATH, fileData, 'utf8');