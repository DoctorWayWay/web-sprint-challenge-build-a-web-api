// add middlewares here related to actions
const Actions = require("./actions-model")

async function validateActionsId(req, res, next) {
  const { id } = req.params
  const project = await Actions.get(id)
  if (project) {
    next()
  } else {
    next({ status: 404, message: "Could not find action" })
  }
}

function validateNewAction(req, res, next) {
  const { project_id, description, notes } = req.body
  if (description.toString().length > 128) {
    next({
      status: 400,
      message: "Description must be under 129 characters"
    })
  } else if (project_id && description && notes) {
    next()
  } else {
    next({
      status: 400,
      message: "Please provide a project_id, notes, and a description to your action."
    })
  }
}

module.exports = {
  validateActionsId,
  validateNewAction,
}
