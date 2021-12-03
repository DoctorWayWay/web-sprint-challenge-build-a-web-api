// Write your "actions" router here!
// ===== IMPORTS =====
const express = require("express")
const Actions = require("./actions-model")
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

// Error MiddleWare
router.use(handleError)

module.exports = router
