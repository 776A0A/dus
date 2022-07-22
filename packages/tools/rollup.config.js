import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

const sharedConfig = {
  input: 'src/index.ts',
  plugins: [commonjs(), typescript(), nodeResolve()],
  external: ['qs', 'spark-md5', 'split.js'],
}

export default defineConfig([
  {
    output: [{ file: pkg.module, format: 'es', sourcemap: true }],
    ...sharedConfig,
  },
  {
    output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
    ...sharedConfig,
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types }],
    plugins: [dts()],
  },
])
