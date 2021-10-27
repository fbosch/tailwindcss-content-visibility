const plugin = require('tailwindcss/plugin')

const baseStyles = {
  'contain-intrinsic-size': 'var(--tw-intrinsic-size)',
}

const contentVisibility = plugin(
  function ({ addComponents, matchComponents, addUtilities, theme, variants, separator, e }) {
    const values = theme('intrinsicSize')

    const contentVisibilityUtilities = {
      '.visibility-auto': {
        'content-visibility': 'auto'
      }
      '.visibility-hidden': {
        'content-visibility': 'hidden'
      },
      '.visibility-visible': {
        'content-visibility': 'visible'
      }
    }

    addUtilities(contentVisibilityUtilities, { variants: ['responsive'] })

    if (matchComponents) {
      if (matchComponents) {
        matchComponents(
          {
            'intrinsic-size': (value) => [
              {
                ...baseStyles,
                '--tw-intrinsic-size': value,
              },
            ],
          },
          { values }
        )
      }

      return
    }

    const baseSelectors = Object.entries(values)
      .map(([key, value]) => `.${e(`intrinsic-size${separator}${key}`)}`)
      .join(',\n')

    addComponents([
      {
        [baseSelectors]: baseStyles,
      },
      Object.entries(values).map(([key, value]) => ({
        [`.${e(`intrinsic-size${separator}${key}`)}`]: {
          '--tw-intrinsic-size': value,
        },
      })),
      variants('intrinsicSize'),
    ])
  },
  {
    theme: {
      intrinsicSize: {
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        px: '1px',
        full: '100%',
        screen: '100vh',
      },
    },
    variants: {
      intrinsicSize: ['responsive'],
    },
  }
)

module.exports = containIntrinsicSize
