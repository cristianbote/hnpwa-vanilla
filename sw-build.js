const fs = require('fs');
const FILE_PATH = './public/sw.js';
const DESTINATION_PATH = './public/sw.js';
const HASH =  Math.round(Date.now() * Math.random()).toString(16);

console.log('[sw] build with', HASH);
let fileData = fs.readFileSync(FILE_PATH, 'utf8');

console.log('[sw] replace {{cache}}');
fileData = fileData.replace('{{cache}}', HASH);

console.log('[sw] write file', DESTINATION_PATH);
fs.writeFileSync(DESTINATION_PATH, fileData, 'utf8');