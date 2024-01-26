import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';
import babel from '@rollup/plugin-babel';

export default {
  input: "src/main.ts",
  meta: {
    name: "ImageFolder",
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    authorId: "619261917352951815",
    website: pkg.repository.url,
    source: `${pkg.repository.url}/blob/master/build/ImageFolder.plugin.js`,
  },
  plugins: [
    typescript({
      jsx: "react",
      compilerOptions: {
        target: "es6"
      }
    }),
    string({ include: [ '**/*.css', '**/*.svg' ] }),
    babel({ include: '**/*.tsx', babelHelpers: 'bundled' })
  ]
}