// eslint.config.js — ESLint "flat config" (ESLint 9+).
// Run it with:  npm run lint   (= eslint .)
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  { ignores: ["node_modules/"] },
  js.configs.recommended, // unused variables, undefined names, unreachable code, ...
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },
];
