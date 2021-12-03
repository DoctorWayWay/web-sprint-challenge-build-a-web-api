// Write your "projects" router here!
// ===== IMPORTS =====
const express = require("express")
const Projects = require("./projects-model")
const { handleError } = require("./projects-middleware")

// ===== INSTANCE OF EXPRESS =====
const router = express.Router()

// ===== ENDPOINTS =====
router.get("/", async (req, res, next) => {
  try {
    const allProjects = await Projects.get()
    res.status(200).json(allProjects)
  } catch (error) {
    next(error)
  }
})

// Error MiddleWare
router.use(handleError)

module.exports = router
