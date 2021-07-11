module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
};
