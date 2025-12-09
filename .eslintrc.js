module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/jsx-runtime'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
      env: { jest: false }, // 或者 extends: [] 把 jest 配置清空
    },
  ],
};
