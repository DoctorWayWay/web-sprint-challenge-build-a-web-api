// Write your "projects" router here!
// ===== IMPORTS =====
const express = require("express")
const Projects = require("./projects-model")
const {
  validateProjectId,
  handleError
} = require("./projects-middleware")

// ===== INSTANCE OF EXPRESS =====
const router = express.Router()

// ===== ENDPOINTS =====
// [GET] /api/projects (returns an array of all the projects)
router.get("/", async (req, res, next) => {
  try {
    const allProjects = await Projects.get()
    res.status(200).json(allProjects)
  } catch (error) {
    next(error)
  }
})

// [GET] /api/projects/:id (returns a specific)
router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params
    const project = await Projects.get(id)
    res.status(200).json(project)
  } catch (error) {
    next(error)
  }
})

// Error MiddleWare
router.use(handleError)

module.exports = router
