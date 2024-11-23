import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
//NEW
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // NEW
      typescript({ tsconfig: './tsconfig.json' }),
      peerDepsExternal(),

      resolve(),
      commonjs(),

      // NEW
      terser(),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
    external: ['webpack.config.js', '.babelrc.js'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
  {
    input: 'src/main.css',
    output: [{ file: 'dist/index.css', format: 'es' }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
];
