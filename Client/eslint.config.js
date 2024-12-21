import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,d.ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  // Add this in the rule definitions
  {
    name: 'custom/no-unused-vars',
    rules: {
      'no-unused-vars': 'off', // Disable
      // or
      'no-unused-vars': ['warn', { vars: 'all', args: 'none' }], // Relax
    },
  },
  
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
]
