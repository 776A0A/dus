import { defineConfig } from 'vitest/config';
import { getBaseViteConfig, getEnvsAndDefinitions } from './packages/vite';

export default defineConfig(
	({ mode }) => {
		const { envVars, definitions } = getEnvsAndDefinitions(mode);

		const baseConfig = getBaseViteConfig(envVars);

		return {
			...baseConfig,
			define: { ...definitions },
			test: {
				environment: 'jsdom',
			},
		};
	},
);
