import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import sass from 'node-sass';

function processSass(context, payload) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: context,
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      },
    );
  });
}

export default {
  input: './src/main.ts',
  output: {
    file: 'main.renderer.js',
    format: 'cjs',
  },
  external: ['tinify', 'electron'],
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': [
          'Component',
          'createElement',
          'Fragment',
        ],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
    typescript(),
    replace({ 'process.env': JSON.stringify(process.env) }),
    postcss({
      extract: 'index.css',
      extensions: ['css', 'scss'],
      process: processSass,
    }),
  ],
};
