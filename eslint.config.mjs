import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "no-const-assign": "error",
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  },
  pluginJs.configs.recommended,
];