import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // ESLint recommended config
  pluginJs.configs.recommended,

  // Custom configuration
  {
    languageOptions: {
      globals: globals.browser, // Use the browser globals from 'globals' package
    },
    rules: {
      "no-unused-vars": "off", // Warn on unused variables
    },
  }
];