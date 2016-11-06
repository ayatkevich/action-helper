# action-helper

[![Build Status](https://travis-ci.org/ayatkevich/action-helper.svg?branch=master)](https://travis-ci.org/ayatkevich/action-helper)

The simplest action creator for redux.

## Install

```bash
npm install --save action-helper
```

## Why?

To reduce code generation.

I was dead tired to write all this action each time:

```js

const CONSTANT = 'CONSTANT'; // WHY?! constants string itself is a constant

const action = ({param}) => ({
  type: CONSTANT,
  param
});

```

So I came with `action-helper` to reduce all of these with:

```js

import action from 'action-helper';

export const login = action('LOGIN', 'username', 'password');

```

And now you can get a type of this action by simply doing:

```js
console.log(login.type); // prints LOGIN
```

And get an action object simply by doing:

```js
console.log(login({username: 'root', password: 'qwerty'}));
// logs {type: 'LOGIN', username: 'root', password: 'qwerty'}
```

Less code, less stress.
