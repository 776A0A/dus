import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true },
    ],
    plugins: [commonjs(), nodeResolve(), typescript()],
    external: Object.keys(pkg.peerDependencies),
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types }],
    plugins: [dts()],
  },
])
