/**
 * @param {Function} func
 * @returns Function wrapped by try & catch
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
