# tailwindcss-content-visibility

A tailwind plugin for [content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility) &amp; [contain-intrinsic-size](https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size)

## Usage

Use `visibility-auto`, `visibility-hidden` or `visibility-visible` in combination with `intrinsic-size` ([square / width & height](https://drafts.csswg.org/css-sizing-4/#propdef-contain-intrinsic-size)).

```html
<div class="visibility-auto intrinsic-size-9">
  // ...
</div>
```

or use `intrinsic-w` & `intrinsic-h` for more specific placeholder sizing.

```html
<div class="visibility-auto intrinsic-h-3 intrinsic-w-5">
  // ...
</div>
```

all classes have `responsive` variants, so they can be used in a variety of different combinations.

```html
<div class="md:visibility-auto md:intrinsic-h-3 md:intrinsic-w-5 lg:intrinsic-size-12">
  // ...
</div>
```

---

the `intrinsic-size` & `intrinsic-w` class options inherit from your theme's [`width`](https://tailwindcss.com/docs/width) definitions.

The same goes for the `intrinsic-h` variants which inherit from the defined [`height`](https://tailwindcss.com/docs/height) in your theme.
