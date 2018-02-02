const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const options = [
    { from: path.resolve(__dirname, './src/index.html'), to: path.resolve(__dirname, './public/') },
    { from: path.resolve(__dirname, './src/manifest.json'), to: path.resolve(__dirname, './public/') },
    { from: path.resolve(__dirname, './src/sw.js'), to: path.resolve(__dirname, './public/') },
    { from: path.resolve(__dirname, './assets'), to: path.resolve(__dirname, './public/') },
    { from: path.resolve(__dirname, './favicon.ico'), to: path.resolve(__dirname, './public/') }
];

const copy = (from, to) => {

    const args = [
        '-v'
    ];

    if (!fs.existsSync(to)) {
        fs.mkdirSync(to);
    }

    if (fs.lstatSync(from).isDirectory()) {
        args.push('-r');
    }

    exec(`cp ${args.join(' ')} ${from} ${to}`, (err, stdout) => {

        if (err) {
            console.log('[copy-assets] error', err);
            return;
        }

        console.log(stdout);
    });
};

options.forEach(entry => copy(entry.from, entry.to));