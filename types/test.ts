import actionHelper = require('action-helper');
import { SimpleAction } from './types';

interface LoginData {
  username: string;
  password: string;
}

/**
 * Test if there is no type argument
 */
// $ExpectError
actionHelper();

/**
 * Test type of the type argument
 */
// $ExpectError
actionHelper(1);

/**
 * Test call with additional parameters
 */
// $ExpectError
actionHelper('LOGIN', 'some argument');

/**
 * Test login without strictly passed data interface
 */
(() => {
  const login = actionHelper('LOGIN');

  // $ExpectError
  login({username: 'user', password: 'pwd'});
})();

/**
 * Test login without strictly passed data interface
 */
(() => {
  const login = actionHelper('LOGIN');

  // $ExpectType SimpleAction
  login();
})();

/**
 * Test login without object data
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN');

  // $ExpectError
  login();
})();

/**
 * Test login with object data which does not match with interface
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN');

  // $ExpectError
  login({username: 'user'});
})();

/**
 * Test login with strictly passed data interface
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN');

  // $ExpectType LoginData
  login({username: 'user', password: 'pwd'});
})();
