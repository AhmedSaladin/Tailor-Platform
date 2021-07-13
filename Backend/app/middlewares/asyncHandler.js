/**
 * @param {Function} func
 * @returns Function wrapped by try & catch
 */
module.exports = (func) => {
  return (req, res, next) => {
    try {
      func(req, res);
    } catch (err) {
      next(err);
    }
  };
};
