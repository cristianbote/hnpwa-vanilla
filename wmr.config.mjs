import htmlMinifier from 'rollup-plugin-html-minifier';
import replace from '@rollup/plugin-replace';


export function build({ plugins }) {
  plugins.push(
    htmlMinifier({
      options: {
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        preserveLineBreaks: false
      }
    })
  );
}