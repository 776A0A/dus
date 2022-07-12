import { getBaseViteConfig, getEnvsAndDefinitions } from '@dus/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  const { envVars, definitions } = getEnvsAndDefinitions(mode)

  const baseConfig = getBaseViteConfig(envVars)

  const dtsConfig: Parameters<typeof dts>[0] = {
    entryRoot: '.',
    tsConfigFilePath: '../../tsconfig.json',
    include: ['./Slider.vue'],
    cleanVueFileName: true,
    beforeWriteFile: (path, content) => {
      return { filePath: path.replace('Slider', 'index'), content }
    },
  }

  return {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      dts({ ...dtsConfig, outputDir: 'dist/es' }),
      dts({ ...dtsConfig, outputDir: 'dist/lib' }),
    ],
    define: { ...definitions },
    test: { environment: 'jsdom' },
    build: {
      ...baseConfig.build,
      target: 'modules',
      outDir: 'dist',
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        external: ['vue'],
        input: ['./index.ts'],
        output: [
          {
            format: 'es',
            dir: 'dist/es',
            entryFileNames: '[name].js',
          },
          {
            format: 'cjs',
            dir: 'dist/lib',
            entryFileNames: '[name].js',
          },
        ],
      },
      lib: {
        entry: './index.ts',
        name: '@dus/slider',
      },
    },
  }
})
