/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import { getBaseViteConfig, getEnvsAndDefinitions } from '../packages/vite'

export default defineConfig(({ mode }) => {
  const { envVars, definitions } = getEnvsAndDefinitions(mode)

  const baseConfig = getBaseViteConfig(envVars)

  baseConfig.plugins.push(Pages({ dirs: 'src/views' }))

  return {
    ...baseConfig,
    define: { ...definitions },
    test: { environment: 'jsdom' },
  }
})
