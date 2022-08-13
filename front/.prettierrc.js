module.exports = {
  printWidth: 140,
  tabWidth: 2,
  trailingComma: 'es5',
  semi: true,
  singleQuote: true,
  jsxBracketSameLine: false,
  bracketSpacing: true,
  parser: 'typescript',
  jsxSingleQuote: false,
  arrowParens: 'avoid',
  overrides: [
    {
      files: 'src/**/*.scss',
      options: {
        parser: 'scss',
      },
    },
  ],
};
