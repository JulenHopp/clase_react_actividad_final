import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ✅ Ignorar archivos de prueba
  {
    ignores: ["**/*.test.jsx", "**/__test__/**"],
  },

  // ✅ Config común para JS
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },

  // ✅ Config para navegadores
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // ✅ Habilitar Jest en archivos de prueba
  {
    files: ["**/*.test.jsx"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]);