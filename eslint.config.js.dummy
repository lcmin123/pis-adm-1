import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommened,
      reactHooks.configs.flat.recommendedLatest,
      reactRefresh.configs.vite,
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
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      // TanStack Query 권장 규칙! (plugin:@tanstack/eslint-plugin-query/recommended)
      "@tanstack/query/exhaustive-deps": "error", //쿼리 함수에서 사용하는 외부 변수는 쿼리 키에 추가하세요!
      "@tanstack/query/stable-query-client": "error", //애플리케이션에서 하나의 쿼리 클라이언트를 생성해 사용하세요!
      "@tanstack/query/no-rest-destructuring": "warn", //쿼리의 반환에서 나머지 매개변수(...rest)를 사용하지 마세요!
    },
    plugins: {
      "react-compiler": require("eslint-plugin-react-compiler"),
      "@tanstack/eslint-plugin-query": require("eslint-plugin-query"),
    },
  },
]);
