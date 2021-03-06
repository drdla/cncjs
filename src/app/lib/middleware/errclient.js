/**
 * errclient
 *
 * Examples:
 *
 *     app.use(middleware.errclient({ error: 'XHR error' }))
 *
 * Options:
 *
 *   - error    error message
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

const errclient = options => {
  let localOptions = options;
  localOptions = localOptions || {};

  const error = localOptions.error || '';

  return (err, req, res, next) => {
    if (req.xhr) {
      res.send(500, {
        error,
      });
      return;
    }

    next(err);
  };
};

module.exports = errclient;
