module.exports = {
  extends: ['@strv/eslint-config-react', '@strv/eslint-config-react/optional'],
  overrides: [
    {
      files: ['**/**.test.js'],
      env: {
        jest: true,
      },
    },
  ],
}
