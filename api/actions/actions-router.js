// Write your "actions" router here!
// ===== IMPORTS =====
const express = require("express")
const Actions = require("./actions-model")
const {
  validateUpdatedAction,
  validateActionsId,
  validateNewAction,
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

// [POST] /api/actions (posts & returns new action)
router.post("/", validateNewAction, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body)
    res.status(201).json(newAction)
  } catch (error) {
    next(error)
  }
})

// [PUT] /api/actions/:id (updates & returns an action by id)
router.put("/:id", validateActionsId, validateUpdatedAction, async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedAction = await Actions.update(id, req.body)
    res.status(200).json(updatedAction)
  } catch (error) {
    next(error)
  }
})

// [DELETE] /api/actions/:id (removes action, returns nothing)
router.delete("/:id", validateActionsId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id)
    next()
  } catch (error) {
    next(error)
  }
})

// Error MiddleWare
router.use(handleError)

module.exports = router
