const {isAuthenticated, isAuthorized} = require('../middleware/authMiddleware')
const express = require('express')
const { borrowedBooks,recordBorrowedBooks, getBorrowedBooksForAdmin, returnBorrowedBook,  } = require('../controllers/borrowController')
const router = express.Router()

router.post("/record-borrow-book/:id", isAuthenticated, isAuthorized("Admin"), recordBorrowedBooks )
router.put("/return-borrowed-book/:bookId", isAuthenticated, isAuthorized("Admin"), returnBorrowedBook )
router.get("/borrowed-book-by-users", isAuthenticated, isAuthorized("Admin"), getBorrowedBooksForAdmin )
router.get("/my-borrowed-book", isAuthenticated, borrowedBooks )

module.exports = router