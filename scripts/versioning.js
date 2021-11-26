const fs = require('fs');
const path = require('path');
const version = require('../package.json').version;
const includes = [
    './index.html',
    './sw.js',
];
const replace = {
    '{{v}}': version,
    '{{cache}}': 'hnpwa-' + Date.now()
};

console.log('[versioning]...');

for (let i in includes) {
    const filename = includes[i];
    const FILE_PATH = path.resolve(__dirname, '..', 'dist', filename);

    if (FILE_PATH) {
        let fileData = fs.readFileSync(FILE_PATH, 'utf8');
        console.log(`[versioning] [${filename}]...`);
        for (const key in replace) {
            fileData = fileData.replace(key, replace[key]);
        }
        fs.writeFileSync(FILE_PATH, fileData, 'utf8');
        console.log(`[versioning] [${filename}] OK`);
    }
}

console.log(`[versioning] DONE`);