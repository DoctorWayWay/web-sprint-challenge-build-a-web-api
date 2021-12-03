// ===== IMPORTS =====
require('dotenv').config()
const express = require('express')

// ===== INSTANCE OF EXPRESS =====
const server = express()

// ===== MIDDLEWARE =====
server.use(express.json())

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server
