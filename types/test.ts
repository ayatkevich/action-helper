import actionHelper = require('..');

type SimpleAction = {type: string};
type Action<Payload> = SimpleAction & Payload;
type PartialAction<Payload> = SimpleAction & Partial<Payload>;

interface LoginData {
  username: string;
  password: string;
}

type LoginAction = Action<LoginData>;
type PartialLoginAction = PartialAction<LoginData>;

/**
 * Test mandatory type argument
 */
// $ExpectError
actionHelper();

/**
 * Test type of type argument
 */
// $ExpectError
actionHelper(1);

/**
 * Test types of keys arguments
 */
// $ExpectError
actionHelper('LOGIN', 0, []);

/**
 * Test login with incorrect keys
 */
// $ExpectError
actionHelper<LoginData>('LOGIN', 'errorUsername', 'errorPassword');

/**
 * Test actionHelper without keys interface & with passed keys arguments
 */
// $ExpectError
actionHelper('LOGIN', 'username', 'password');

/**
 * Test login with only type parameter
 */
(() => {
  const login = actionHelper('LOGIN');

  // $ExpectType SimpleAction
  login();
})();

/**
 * Test parameterized login with strictly passed data interface
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN');

  // $ExpectType LoginAction
  login({username: 'user', password: 'pwd'})
})();

/**
 * Test actionHelper with partial keys parameters & login with same parameters
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN', 'username');

  // $ExpectType PartialLoginAction
  login({username: 'user'});
})();

/**
 * Test actionHelper with all partial keys parameters & login with same parameters
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN', 'username', 'password');

  // $ExpectType PartialLoginAction
  login({username: 'user', password: 'pwd'});
})();

/**
 * Test login with same keys
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN', 'username', 'password');

  // $ExpectError
  login({errorUsername: 'user', errorPassword: 'pwd'});
})();

/**
 * Test actionHelper with partial keys parameters & login with same & another parameters
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN', 'username');

  // $ExpectType PartialLoginAction
  login({username: 'user', password: 'pwd'});
})();

/**
 * Test actionHelper with partial keys parameters & login with same parameters & parameters which not matched with interface
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN', 'username');

  // $ExpectType PartialLoginAction
  login({username: 'user', foo: 'bar'});
})();

/**
 * Test actionHelper with partial keys parameters & login with another parameters
 */
(() => {
  const login = actionHelper<LoginData>('LOGIN', 'username');

  // $ExpectError
  login({password: 'pwd'});
})();
