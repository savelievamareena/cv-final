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
    plugins: ["@typescript-eslint", "prettier", "prefer-arrow", "import"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                trailingComma: "es5",
                jsxSingleQuote: false,
                singleQuote: false,
            },
        ],
        "import/no-cycle": ["error"],
        "import/order": [
            "error",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                pathGroups: [
                    {
                        pattern: "react",
                        group: "external",
                        position: "before",
                    },
                    {
                        pattern: "react-dom",
                        group: "external",
                        position: "before",
                    },
                    {
                        pattern: "{react*,react-dom*}",
                        group: "external",
                        position: "before",
                    },
                    {
                        pattern: "@/**",
                        group: "internal",
                        position: "after",
                    },
                    {
                        pattern: "**/*.css",
                        group: "index",
                        position: "after",
                    },
                    {
                        pattern: "**/*.scss",
                        group: "index",
                        position: "after",
                    },
                ],
                pathGroupsExcludedImportTypes: ["builtin", "external"],
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            },
        ],
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "prefer-arrow/prefer-arrow-functions": "error",
    },
};
