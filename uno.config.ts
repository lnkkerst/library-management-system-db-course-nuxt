import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerAttributifyJsx,
  transformerDirectives
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetTagify(),
    presetWebFonts(),
    presetTypography(),
    presetAttributify()
  ],
  transformers: [transformerDirectives(), transformerAttributifyJsx()]
});
