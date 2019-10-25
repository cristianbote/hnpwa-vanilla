const fs = require('fs');
const version = require('./package.json').version;
const FILE_PATH = './public/index.html';
const DESTINATION_PATH = './public/index.html';
const minify = require('html-minifier').minify;

console.log('[html-minify] reading file');
let fileData = fs.readFileSync(FILE_PATH, 'utf8');
let size = fileData.length;

console.log('[html-minify] minify');
fileData = minify(fileData, {
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true,
    preserveLineBreaks: false
});

fileData = fileData.replace('{{ version }}', version);

console.log('[html-minify] write file', DESTINATION_PATH, ((1 - fileData.length / size) * 100).toFixed(2));
fs.writeFileSync(DESTINATION_PATH, fileData, 'utf8');
