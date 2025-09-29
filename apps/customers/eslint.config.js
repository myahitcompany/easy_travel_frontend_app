const path = require('path');

module.exports = {
  root: true,
  extends: ['custom'],
  ignorePatterns: ['.eslintrc.cjs' ],
  parserOptions: {
    project: path.resolve(__dirname, 'tsconfig.json'),
  },
  settings: {
    node: {
      paths: ['.'],
    },
    'import/resolver': {
      alias: {
        map: [['@/*', 'src/*']],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
