import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      format: 'es',
      file: 'dist/index.mjs',
    },
    {
      format: 'cjs',
      file: 'dist/index.cjs',
    },
    {
      format: 'es',
      file: 'dist/index.d.ts',
    },
  ],
  plugins: [commonjs(), typescript(), nodeResolve(), dts()],
  external: ['qs', 'spark-md5', 'split.js'],
})
