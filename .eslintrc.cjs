module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: ['dist'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
}
