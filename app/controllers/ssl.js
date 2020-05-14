const model = require('../models/ssl')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const auth = require('../controllers/auth')

/********************
 * Public functions *
 ********************/

 /**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllItems = async (req, res) => {
  try {
    var user = await auth.getUserFromBearerToken(req.headers.authorization)
    if( user.role === 'admin' ){
      const query = await db.checkQueryString(req.query)
      res.status(200).json(await db.getItems(req, model, query))
    }else{
      res.status(200).json(await db.getItemsByUserId(req, model, query, user._id))
    }
    // const id = await utils.isIDGood( req.params.user_id )
    // res.status(200).json(await getAllItemsByUser_id(id))
  } catch (error) {
    utils.handleError(res, error)
  }
}