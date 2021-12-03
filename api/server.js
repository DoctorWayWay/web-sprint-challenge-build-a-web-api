// ===== IMPORTS =====
require('dotenv').config()
const express = require('express')
const projectsRouter = require("./projects/projects-router")

// ===== INSTANCE OF EXPRESS =====
const server = express()

// ===== ROUTES =====
server.use("/api/projects", projectsRouter)

// ===== MIDDLEWARE =====
server.use(express.json())

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server
