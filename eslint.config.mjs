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
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'never',
            component: 'always'
          },

          svg: 'always',
          math: 'always'
        }
      ],
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': 'off'
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
