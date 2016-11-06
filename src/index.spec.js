var test = require('ava');

var actionFromPackage = require('../');
var action = require('./');

test('exports the same', function (t) {
  t.is(action, actionFromPackage);
});

test('just type', function (t) {
  t.deepEqual(action('TEST')(), {type: 'TEST'});
});

test('no type, no args', function (t) {
  t.throws(function () {
    action();
  }, function (err) {
    return err.name === 'TypeError';
  });
});

test('can get a type without instantiation', function (t) {
  t.is(action('TYPE').type, 'TYPE');
});

var authAction = action('LOGIN', 'username', 'password');

test('can instantiate with args', function (t) {
  t.deepEqual(authAction(), {
    type: 'LOGIN',
    username: undefined,
    password: undefined
  });
});

test('can instantiate with args and values passed as object', function (t) {
  t.deepEqual(authAction({
    username: 'User!',
    password: '1234567',
    __thisPropertyWontBeInTheResult: 'yep'
  }), {
    type: authAction.type,
    username: 'User!',
    password: '1234567'
  });
});

test('pass inappropriate value', function (t) {
  t.deepEqual(authAction(function () {}), {
    type: 'LOGIN',
    username: undefined,
    password: undefined
  });
});

test('pass an array', function (t) {
  t.deepEqual(action('HEAD_OF', '0', 'length')([1, 2, 3]), {
    type: 'HEAD_OF',
    0: 1,
    length: 3
  });
});

test('can instantiate without any arg yet still be able to pass values',
  function (t) {
    t.deepEqual(action('NO_ARG')({a: 1, b: 2}), {
      type: 'NO_ARG',
      a: 1,
      b: 2
    });
  }
);
