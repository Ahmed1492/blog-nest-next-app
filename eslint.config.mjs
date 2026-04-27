import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Treat all warnings as errors
      "no-console": "error",
      "no-unused-vars": "error",
      "@next/next/no-img-element": "error",
      "react/no-unescaped-entities": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
];

export default eslintConfig;
