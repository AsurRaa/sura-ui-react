import * as fs from "fs";
import * as path from "path";

const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  babelOptions: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  },
  requireConfigFile: false,
  project: "./tsconfig.json",
};

const isJsMoreTs = async (path = "src") => {
  const fg = require("fast-glob");
  const jsFiles = await fg(`${path}/src/**/*.{js,jsx}`, { deep: 3 });
  const tsFiles = await fg(`${path}/src/**/*.{ts,tsx}`, { deep: 3 });
  return jsFiles.length > tsFiles.length;
};

const isTsProject = fs.existsSync(
  path.join(process.cwd() || ".", "./tsconfig.json")
);

if (isTsProject) {
  try {
    isJsMoreTs(process.cwd()).then((jsMoreTs) => {
      if (!jsMoreTs) return;
      console.log("For TS with tsconfig.json");
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  rules: {
    indent: ["error", 2],
    quotes: ["warn", "double"],
    semi: "off",
    "no-any": "off",
    "no-console": "off",
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-empty-interface": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".*"],
      },
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  ...parserOptions,
};
