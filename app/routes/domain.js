const controller = require('../controllers/domain')
const validate = require('../controllers/domain.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Get all items route
 */
router.get('/',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    controller.getAllItems
 )

/*
 * Create new ssl_file route
 */
router.post(
    '/',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    validate.createItem,
    controller.createItem
)

/*
 * Update item route
 */
router.patch(
    '/:id',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    validate.updateItem,
    controller.updateItem
)

/*
 * Delete item route
 */
router.delete(
    '/:id',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    validate.deleteItem,
    controller.deleteItem
  )


module.exports = router