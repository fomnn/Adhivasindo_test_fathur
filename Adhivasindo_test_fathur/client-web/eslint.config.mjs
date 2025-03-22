import antfu from '@antfu/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'

export default antfu(
  {
    typescript: true,
    react: true,
    jsx: 'react',
    stylistic: true,
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
    },
    ignores: [
      'src/main.tsx',
    ],
  },
  ...pluginRouter.configs['flat/recommended'],
)
