import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { getBaseViteConfig, getEnvsAndDefinitions } from '../packages/vite';

export default defineConfig(
  ({ mode }) => {
    const { envVars, definitions } = getEnvsAndDefinitions(mode);

    const baseConfig = getBaseViteConfig(envVars);

    return {
      ...baseConfig,
      plugins: [
        ...baseConfig.plugins,
        Components({ resolvers: [IconsResolver({ prefix: false })], dts: true }),
        Icons({ compiler: 'vue3' }),
      ],
      define: { ...definitions },
    };
  },
);
