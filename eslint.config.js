import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslImport from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'import': eslImport,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettier
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "quote-props": ["warn", "as-needed"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "object-curly-spacing": ["error", "always"],
      semi: ["error", "always"],
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          functions: false,
          classes: true,
          variables: false,
        },
      ],
      "no-trailing-spaces": "off",
      "@typescript-eslint/promise-function-async": "off",
      "no-return-assign": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          ignoredMethodNames: ["constructor"],
        },
      ],
      "no-async-promise-executor": "off",
      "no-new": 0,
      "require-await": "error",
      "jsx-quotes": ["error", "prefer-double"],
      "@typescript-eslint/ban-ts-comment": "off",
      "no-multi-str": 0,
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/ban-types": "off",
      "react/no-unknown-property": "off",
      "@typescript-eslint/prefer-readonly": "off",
      "space-infix-ops": 0,
      "lines-between-class-members": 0,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "import/no-unresolved": "error",
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          trailingComma: "all",
          useTabs: false,
          semi: true,
          bracketSpacing: true,
          printWidth: 100,
          endOfLine: "auto",
          tabWidth: 2,
        },
      ],
    },
  },
)
