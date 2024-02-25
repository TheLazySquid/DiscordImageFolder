import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';
import babel from '@rollup/plugin-babel';
import arrayBuffer from '@wemap/rollup-plugin-arraybuffer';

export default {
  input: "src/main.ts",
  meta: {
    name: "ImageFolder",
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    authorId: "619261917352951815",
    website: pkg.repository.url,
    source: `${pkg.repository.url}/blob/main/build/ImageFolder.plugin.js`,
  },
  plugins: [
    typescript({
      jsx: "react",
      compilerOptions: {
        target: "es2022"
      }
    }),
    arrayBuffer({ include: '**/*.otf' }),
    string({ include: [ '**/*.css', '**/*.svg' ] }),
    babel({ include: '**/*.tsx', babelHelpers: 'bundled' })
  ]
}