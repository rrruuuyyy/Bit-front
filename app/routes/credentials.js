const controller = require('../controllers/credentials')
const validate = require('../controllers/credentials.validate')
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
 * Get items route by BitNinja
 */
router.get(
    '/bitninja',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    controller.getBitninja
)
/*
 * Create new item by BitNinja
 */
router.post(
    '/bitninja',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    validate.createItemBitninja,
    controller.createBitNinja
)
/*
 * Create new item by BitNinja
 */
router.patch(
    '/bitninja',
    requireAuth,
    AuthController.roleAuthorization(['admin']),
    trimRequest.all,
    validate.updateItemBitninja,
    controller.updateBitNinja
)
module.exports = router
