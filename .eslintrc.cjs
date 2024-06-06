module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.js"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint", "prettier", "prefer-arrow"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                trailingComma: "es5",
                jsxSingleQuote: false,
                singleQuote: false,
            },
        ],
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "prefer-arrow/prefer-arrow-functions": "error",
    },
};
