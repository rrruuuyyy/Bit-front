const controller = require('../controllers/ssl')
const validate = require('../controllers/ssl.validate')
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
router.get('/', controller.getAllItems)

/*
 * Create new ssl_file route
 */
router.post(
    '/',
    requireAuth,
    AuthController.ownerOrAdmin(),
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
