// https://github.com/toshi-toma/eslint-config-airbnb-typescript-prettier
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['fp', 'jsx-a11y', 'import', 'prettier', '@typescript-eslint'],
  globals: {},
  rules: {
    // prettier
    'prettier/prettier': ['error'],
    // TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // prefer default export
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    // no classes
    // https://github.com/jfmengels/eslint-plugin-fp
    'fp/no-class': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
    'import/extensions': ['.ts', '.js'],
  },
}
