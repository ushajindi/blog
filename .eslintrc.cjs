module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/default-param-last': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-param-reassign': 'off',
    'no-useless-escape': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
