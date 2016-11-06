module.exports = function (type) {
  if (!type) {
    throw new TypeError('action function requires at least one argument');
  }

  var keys = [].slice.call(arguments, 1);

  action.type = type;
  return action;

  function action(values) {
    values = typeof values === 'object' ? values : {};
    var result = {type: type};

    (keys.length ? keys : Object.keys(values)).forEach(function (key) {
      result[key] = values[key];
    });

    return result;
  }
};
