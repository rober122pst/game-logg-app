const { defineConfig, globalIgnores } = require("eslint/config");

const js = require("@eslint/js");
const eslintPluginPrettier = require("eslint-plugin-prettier/recommended");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  globalIgnores(["dist"]),
  expoConfig,
  {
    files: ["**/*.{ts,tsx, js}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      'react/display-name': 'off',
      semi: ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      quotes: ["error", "single"],
      "prettier/prettier": [
        "error",
        {
          semi: true, // exige ponto e vírgula
          tabWidth: 4, // indentação de 4 espaços
          singleQuote: true,
          endOfLine: 'auto',
          trailingComma: "es5", // vírgula no final de objetos e arrays
          printWidth: 120, // limite de caracteres por linha
          bracketSpacing: true, // deixa espaço dentro de { }
          jsxBracketSameLine: false,
          bracketSameLine: false,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);