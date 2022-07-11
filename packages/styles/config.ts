import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import transformerDirective from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { toEscapedSelector as e, UserConfig } from 'unocss'

export default <UserConfig>{
  transformers: [transformerDirective(), transformerVariantGroup()],
  presets: [
    presetIcons({
      autoInstall: true,
      extraProperties: {
        display: 'inline-block',
        height: '1.2em',
        width: '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetUno(),
  ],
  shortcuts: {
    'center-flex': 'flex justify-center items-center',
    'center-abs':
      'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-z-0',
    'center-x-abs': 'absolute left-1/2 transform -translate-x-1/2',
    'center-y-abs': 'absolute top-1/2 transform -translate-y-1/2',
    full: 'w-full h-full',
    fullscreen: 'w-screen h-screen',
    'border-main': 'border-gray-400 border-opacity-30',
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
}
