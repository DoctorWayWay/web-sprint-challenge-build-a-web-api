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

module.exports = {
  validateActionsId,
}
