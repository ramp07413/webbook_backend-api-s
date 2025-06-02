const {isAuthenticated, isAuthorized} = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()
const {addBook, deleteBook, getAllBooks} = require('../controllers/bookController')



router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook);
router.get("/all", isAuthenticated, getAllBooks);
router.get("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteBook)


module.exports = router
