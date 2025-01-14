// Write your "projects" router here!
// ===== IMPORTS =====
const express = require("express")
const Projects = require("./projects-model")
const {
  validateProjectId,
  validateNewProject,
  validateUpdatedProject,
} = require("./projects-middleware")
const { handleError } = require("../general-middleware/middleware")

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

// [GET] /api/projects/:id (returns a specific project)
router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params
    const project = await Projects.get(id)
    res.status(200).json(project)
  } catch (error) {
    next(error)
  }
})

// [POST] /api/projects (posts & returns new project)
router.post("/", validateNewProject, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body)
    res.status(201).json(newProject)
  } catch (error) {
    next(error)
  }
})

// [PUT] /api/projects/:id (updates & returns a post by id)
router.put("/:id", validateProjectId, validateUpdatedProject, async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedProject = await Projects.update(id, req.body)
    res.status(200).json(updatedProject)
  } catch (error) {
    next(error)
  }
})

// [DELETE] /api/projects/:id (removes project, returns nothing)
router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id)
    next()
  } catch (error) {
    next(error)
  }
})

// [GET] /api/projects/:id/actions (returns project's actions by id)
router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params
    const projectActions = await Projects.getProjectActions(id)
    res.status(200).json(projectActions)
  } catch (error) {
    next(error)
  }
})


// Error MiddleWare
router.use(handleError)

module.exports = router
