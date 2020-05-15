const model = require('../models/domain')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const auth = require('../controllers/auth')
var fs = require('fs');
const path = `./uploads`;

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
      var query = await db.checkQueryString(req.query)
      if( user.role === 'admin' ){
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

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
    try {
        req = matchedData(req)
        res.status(201).json(await db.createItem(req, model))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
    try {
        const id = await utils.isIDGood(req.params.id) // Id del archivo previamene subido
        req = matchedData(req)
        res.status(200).json(await db.updateItem(id, model, req))
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
    try {
        req = matchedData(req)
        const id = await utils.isIDGood(req.id)
        res.status(200).json(await db.deleteItem(id, model))
    } catch (error) {
        utils.handleError(res, error)
    }
}