module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    "class-methods-use-this": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "prettier/prettier": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
  }
}
