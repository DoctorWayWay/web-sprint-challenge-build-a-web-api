// add middlewares here related to projects
function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    "message": `${err.message}`
  })
}

module.exports = {
  handleError
}
