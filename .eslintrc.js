module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },

  'extends': [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
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
    "@typescript-eslint/ban-types": "off",
    "react/prop-types": "off",
    "prefer-const": [
      "error",
      {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
      }
    ],
    "prefer-destructuring": ["error", { "object": true, "array": false }],
  },

  "settings": {
    "eslintConfig": {
      "extends": ["prettier", "plugin:jsx-a11y/recommended"],
      "settings": {
        "import/resolver": {
          "node": {
            "paths": ["src"],
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        }
      }
    },
    "react": {
      "version": "detect"
    }
  },
};
