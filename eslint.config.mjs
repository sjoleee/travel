import path from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";
import react from "eslint-plugin-react";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  ...compat.extends("prettier"),
  ...tailwind.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "prefer-const": "warn",
      "no-undef": "off",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", ["parent", "sibling"], "index"],
          "newlines-between": "always",
        },
      ],
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
];

export default configs;
