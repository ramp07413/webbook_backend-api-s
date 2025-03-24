const express = require('express')
const {getAllUsers, registerNewAdmin} = require('../controllers/userController')
const {isAuthenticated, isAuthorized} = require('../middleware/authMiddleware')

const router = express.Router()

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers)
router.post("/add/newAdmin", isAuthenticated, isAuthorized("Admin"), registerNewAdmin)

module.exports = router