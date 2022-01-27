import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

//figure out how to build css file to dist folder
export default 
{
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
         },
        {
            file: pkg.module,
            format: 'es'
        }
    ],
    plugins: [
        commonjs(),
        resolve(),
        terser()
    ]
};