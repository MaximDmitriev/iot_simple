module.exports = {
  plugins: ['jsdoc'],
  rules: {
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-syntax': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/empty-tags': 'error',
    'jsdoc/newline-after-description': 'error',
    'jsdoc/no-types': 'error',
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-description': 'error',
    'jsdoc/require-example': ['off', { exemptNoArguments: true }],
    // TODO: включить, когда платформа будет покрыта jsdoc,
    // чтобы любой публичный api был хотя бы с jsdoc
    // Нужно проанализировать включение настройки в стримах.
    'jsdoc/require-jsdoc': [
      'off',
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      },
    ],
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/require-throws': 'error',
    'jsdoc/valid-types': 'error',
  },
};
