// .eslintrc.cjs

/* eslint-env browser */

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-magic-numbers": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prefer-template": "error"
  },
};
