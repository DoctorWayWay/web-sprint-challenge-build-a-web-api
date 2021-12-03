// Write your "actions" router here!
// ===== IMPORTS =====
const express = require("express")
const Actions = require("./actions-model")
const {
  validateActionsId,
} = require("./actions-middlware")
const { handleError } = require("../general-middleware/middleware")

// ===== INSTANCE OF EXPRESS =====
const router = express.Router()

// ===== ENDPOINTS =====
// [GET] /api/actions (returns an array of all the actions)
router.get("/", async (req, res, next) => {
  try {
    const allActions = await Actions.get()
    res.status(200).json(allActions)
  } catch (error) {
    next(error)
  }
})

// [GET] /api/actions/:id (returns a specific action)
router.get("/:id", validateActionsId, async (req, res, next) => {
  try {
    const { id } = req.params
    const action = await Actions.get(id)
    res.status(200).json(action)
  } catch (error) {
    next(error)
  }
})

// Error MiddleWare
router.use(handleError)

module.exports = router
