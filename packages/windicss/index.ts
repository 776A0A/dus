import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'
import merge from 'lodash.mergewith'

export type WindiConfig = Parameters<typeof defineConfig>[0]

const baseConfig: WindiConfig = {
  extract: {
    include: [
      'index.html',
      'src/**/*.{vue,jsx,tsx,js,ts}',
      'node_modules/@dus/**/*.{vue,ts,tsx,js,jsx,html}',
    ],
  },
  plugins: [
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp'),
    loadUtilities(),
  ],
}

export default baseConfig

export function mergeConfig(config?: WindiConfig) {
  return merge(baseConfig, config, (oVal: unknown, cVal: unknown) => {
    if (Array.isArray(oVal)) {
      return oVal.concat(cVal)
    }
  })
}

function loadUtilities() {
  return plugin(({ addUtilities }) => {
    const classes = {
      '.center-flex': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '.center-abs': {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
      },
      '.center-x-abs': {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      '.center-y-abs': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      },
      '.full': {
        width: '100%',
        height: '100%',
      },
      '.fullscreen': {
        height: '100vh',
        width: '100vw',
      },
      '.hover-shadow': {
        transition: 'all cubic-bezier(0.4, 0, 0.2, 1) 150ms',
        boxShadow: '2px 2px 5px 0px transparent',
        '&:hover': {
          boxShadow: '2px 2px 5px 0px rgb(0 0 0 / 10%)',
        },
      },
      '.content-visibility-auto': {
        'content-visibility': 'auto',
      },
    }

    addUtilities(classes)
  })
}
