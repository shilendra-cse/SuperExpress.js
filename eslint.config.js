import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,

  ...tseslint.configs.strict,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    rules: {
      "no-console": "off",
    },
  },

  {
    ignores: ["dist"],
  },
];
