import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.vue'],
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'vue/multi-word-component-names': ['error'],
      'vue/html-self-closing': 'off',
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off'
    },
    ignores: [
      '**/node_modules',
      '**/dist/',
      '**/public/',
      '**/eslint.config.mjs',
      '**/vite.config.js'
    ]
  }
]
