const plugin = require('tailwindcss/plugin')

const sizeStyles = {
  'contain-intrinsic-size': 'var(--tw-intrinsic-size)',
}
const widthStyles = {
  'contain-intrinsic-width': 'var(--tw-intrinsic-w)',
}
const heightStyles = {
  'contain-intrinsic-height': 'var(--tw-intrinsic-h)',
}

const contentVisibilityUtilities = {
  '.visibility-auto': {
    'content-visibility': 'auto',
  },
  '.visibility-hidden': {
    'content-visibility': 'hidden',
  },
  '.visibility-visible': {
    'content-visibility': 'visible',
  },
}

const contentVisibility = plugin(function ({
  addComponents,
  matchUtilities,
  addUtilities,
  theme,
  variants,
  e,
}) {
  const { auto: _excludeAutoHeight, ...heightValues } = theme('height')
  const { auto: _excludeAutoWidth, ...widthValues } = theme('width')

  addUtilities(contentVisibilityUtilities, { variants: ['responsive'] })

  if (matchUtilities) {
    matchUtilities(
      {
        'intrinsic-size': (value) => [
          {
            ...sizeStyles,
            '--tw-intrinsic-size': value,
          },
        ],
      },
      {
        'intrinsic-w': (value) => [
          {
            ...widthStyles,
            '--tw-intrinsic-w': value,
          },
        ],
      },
      { values: widthValues, variants: ['responsive'] }
    )
    matchUtilities(
      {
        'intrinsic-h': (value) => [
          {
            ...heightStyles,
            '--tw-intrinsic-h': value,
          },
        ],
      },
      { values: heightValues, variants: ['responsive'] }
    )
  }

  const sizeSelectors = Object.entries(widthValues)
    .map(([key, value]) => `.${e(`intrinsic-size-${key}`)}`)
    .join(',\n')

  const widthSelectors = Object.entries(widthValues)
    .map(([key, value]) => `.${e(`intrinsic-w-${key}`)}`)
    .join(',\n')

  const heightSelectors = Object.entries(heightValues)
    .map(([key, value]) => `.${e(`intrinsic-h-${key}`)}`)
    .join(',\n')

  addUtilities(
    [
      {
        [sizeSelectors]: sizeStyles,
        [widthSelectors]: widthStyles,
        [heightSelectors]: heightStyles,
      },
      Object.entries(widthValues).map(([key, value]) => ({
        [`.${e(`intrinsic-size-${key}`)}`]: {
          '--tw-intrinsic-size': value,
        },
      })),
      Object.entries(widthValues).map(([key, value]) => ({
        [`.${e(`intrinsic-w-${key}`)}`]: {
          '--tw-intrinsic-w': value,
        },
      })),
      Object.entries(heightValues).map(([key, value]) => ({
        [`.${e(`intrinsic-h-${key}`)}`]: {
          '--tw-intrinsic-h': value,
        },
      })),
    ],
    ['responsive']
  )
})

module.exports = contentVisibility
