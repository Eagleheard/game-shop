module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "google",
        "plugin:prettier/recommended",
        "prettier"
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    "react",
        "@typescript-eslint",
        "prettier"
  ],
  'rules': {
    "require-jsdoc": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
