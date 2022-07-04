import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { getBaseViteConfig, getEnvsAndDefinitions } from '../packages/vite';
import Pages from 'vite-plugin-pages';

export default defineConfig(
	({ mode }) => {
		const { envVars, definitions } = getEnvsAndDefinitions(mode);

		const baseConfig = getBaseViteConfig(envVars);

		baseConfig.plugins.push(
			Pages({ dirs: 'src/views' }),
			Components({ resolvers: [IconsResolver({ prefix: false })], dts: true }),
			Icons({ compiler: 'vue3' }),
		);

		return {
			...baseConfig,
			define: { ...definitions },
		};
	},
);
