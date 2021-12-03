// add middlewares here related to projects
const Projects = require("./projects-model")

async function validateProjectId(req, res, next) {
  const { id } = req.params
  const project = await Projects.get(id)
  if (project) {
    next()
  } else {
    next({ status: 404, message: "Could not find project" })
  }
}

function validateNewProject(req, res, next) {
  const { name, description } = req.body
  if (name && description) {
    next()
  } else {
    next({
      status: 400,
      message: "Please provide a name and description to your project."
    })
  }
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: `${err.message}`
  })
}

module.exports = {
  validateProjectId,
  validateNewProject,
  handleError,
}
