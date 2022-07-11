import { defineConfig, toEscapedSelector as e } from 'unocss'
import presetUno from '@unocss/preset-uno'
import transformerDirective from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  transformers: [transformerDirective(), transformerVariantGroup()],
  presets: [presetUno()],
  shortcuts: {
    'center-flex': 'flex justify-center items-center',
    'center-abs':
      'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-z-0',
    'center-x-abs': 'absolute left-1/2 transform -translate-x-1/2',
    'center-y-abs': 'absolute top-1/2 transform -translate-y-1/2',
    full: 'w-full h-full',
    fullscreen: 'w-screen h-screen',
  },
  theme: {
    width: {
      full: '100%',
    },
    height: {
      full: '100%',
    },
  },
  rules: [
    [
      /hover-shadow/,
      ([,], { rawSelector }) => {
        const selector = e(rawSelector)
        return `
          ${selector} {
            transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
            box-shadow: 2px 2px 5px 0px transparent;
          }
          ${selector}:hover {
            box-shadow: 2px 2px 5px 0px rgb(0 0 0 / 10%);
          }
        `
      },
    ],
    [
      'content-visibility-auto',
      {
        'content-visibility': 'auto',
      },
    ],
  ],
})
