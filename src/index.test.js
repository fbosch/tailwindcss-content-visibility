const path = require('path')
const tailwind = require('tailwindcss')
const postcss = require('postcss')
const contentVisibilityPlugin = require('.')

let html = String.raw
let css = String.raw

let defaults = css`
  *,
  ::before,
  ::after {
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
  }
`

function run(config, plugin = tailwind) {
  let { currentTestName } = expect.getState()
  config = {
    ...{ plugins: [contentVisibilityPlugin], corePlugins: { preflight: false } },
    ...config,
  }

  return postcss(plugin(config)).process(
    ['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n'),
    {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    }
  )
}

describe('should add content-visiblity styles', () => {
  test('auto', async () => {
    return run({ content: [{ raw: html`<div class="visibility-auto"></div>` }] }).then((result) => {
      expect(result.css).toMatchFormattedCss(css`
        ${defaults}

        .visibility-auto {
          content-visibility: auto;
        }
      `)
    })
  })
  test('hidden', async () => {
    return run({ content: [{ raw: html`<div class="visibility-hidden"></div>` }] }).then(
      (result) => {
        expect(result.css).toMatchFormattedCss(css`
          ${defaults}

          .visibility-hidden {
            content-visibility: hidden;
          }
        `)
      }
    )
  })
  test('visible', async () => {
    return run({ content: [{ raw: html`<div class="visibility-visible"></div>` }] }).then(
      (result) => {
        expect(result.css).toMatchFormattedCss(css`
          ${defaults}

          .visibility-visible {
            content-visibility: visible;
          }
        `)
      }
    )
  })
})

describe('should add intrinsic size styles', () => {
  test('intrinsic-size with arbirary values', async () => {
    return run({ content: [{ raw: html`<div class="intrinsic-size-[100px]"></div>` }] }).then(
      (result) => {
        expect(result.css).toMatchFormattedCss(css`
          ${defaults}

          .intrinsic-size-\[100px\] {
            contain-intrinsic-size: var(--tw-intrinsic-size);
            --tw-intrinsic-size: 100px;
          }
        `)
      }
    )
  })
  test('intrinsic-size with theme width', async () => {
    return run({
      theme: {
        width: {
          10: '2.5rem',
        },
      },
      content: [
        {
          raw: html`<div class="intrinsic-size-10"></div>`,
        },
      ],
    }).then((result) => {
      expect(result.css).toMatchFormattedCss(css`
        ${defaults}

        .intrinsic-size-10 {
          contain-intrinsic-size: var(--tw-intrinsic-size);
          --tw-intrinsic-size: 2.5rem;
        }
      `)
    })
  })
  test('intrinsic-size with responsive values', async () => {
    return run({
      theme: {
        width: {
          5: '1.25rem',
          10: '2.5rem',
        },
      },
      content: [
        {
          raw: html`<div class="intrinsic-size-5 md:intrinsic-size-10"></div>`,
        },
      ],
    }).then((result) => {
      console.log(result.css)
      expect(result.css).toMatchFormattedCss(css`
        ${defaults}

        .intrinsic-size-5,
        .intrinsic-size-10 {
          contain-intrinsic-size: var(--tw-intrinsic-size);
        }
        .intrinsic-size-5 {
          --tw-intrinsic-size: 1.25rem;
        }
        @media (min-width: 768px) {
          .intrinsic-size-5,
          .md\:intrinsic-size-10 {
            contain-intrinsic-size: var(--tw-intrinsic-size);
          }
          .md\:intrinsic-size-10 {
            --tw-intrinsic-size: 2.5rem;
          }
        }
      `)
    })
  })
})
