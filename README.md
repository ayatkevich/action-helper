# action-helper

[![Build Status](https://travis-ci.org/ayatkevich/action-helper.svg?branch=master)](https://travis-ci.org/ayatkevich/action-helper)

The simplest action creator for redux.

## Install

```bash
npm install --save action-helper
```

## Why?

To reduce code generation.
I was dead tired to write all these actions each time.


```js

const CONSTANT = 'CONSTANT'; // WHY?! constant string itself is a constant

const action = ({param}) => ({
  type: CONSTANT,
  param
});

```

So I came with `action-helper` to reduce all of these with:

```js

import action from 'action-helper';

export const login = action('LOGIN', 'username', 'password');

// also, you can declare an action using the shorter method
// this action creator will be able to receive any property
// right into the action, without any restriction like the method above
export const auth = action('AUTH');

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

When you explicitly declare the properties of an action, you won't get anything except them in the result. But, if you do not declare the properties, action creator function will be able to create an action with any properties that can be passed as an object.

```js
login({username: 'root', password: 'qwerty', rememberMe: true});
// {type: 'LOGIN', username: 'root', password: 'qwerty'}

auth({idToken: 'token'});
// {type: 'AUTH', idToken: 'token'}
```

Less code, less stress.
