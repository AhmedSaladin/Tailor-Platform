/**
 * @param {Function} func
 * @returns Async Function wrapped by try & catch
 */
module.exports = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res);
    } catch (err) {
      next(err);
    }
  };
};
