[![NPM](https://img.shields.io/npm/v/@asurraa/teamouy.svg)](https://www.npmjs.com/package/@asurraa/teamouy)

# teamouy

A collection of configuration files containing prettier, eslint, stylelint.

## Installation

With NPM

```bash
npm i -D @asurraa/teamouy
```

With yarn

```bash
yarn add -D @asurraa/teamouy
```

# Use

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('@asurraa/teamouy/dist/eslint')],
  rules: {
    // your rules
  },
};
```

in `.stylelintrc.js`

```js
module.exports = {
  extends: [require.resolve('@asurraa/teamouy/dist/stylelint')],
  rules: {
    // your rules
  },
};
```

in `.prettierrc.js`

```js
const teamouy = require('@asurraa/teamouy');

module.exports = {
  ...teamouy.prettier,
};
```

### @AsurRaa 2021
