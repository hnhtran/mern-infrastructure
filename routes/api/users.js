const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// POST router /api/users
// Create a new user
router.post('/', usersCtrl.create)
// login a user
router.post('/login', usersCtrl.login)
// check token
router.get('/check-token', usersCtrl.checkToken)

module.exports = router