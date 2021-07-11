module.exports = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }
  const status = error.status || 500;
  res.status(status).json({ error });
};
