const workboxBuild = require('workbox-build');

workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'public/sw.js',
    globDirectory: 'public',
    staticFileGlobs: ['**/!(*map*)'],
    globIgnores: ['**/sw.js'],
}).then(() => {
    console.log('The production service worker has been generated.');
});