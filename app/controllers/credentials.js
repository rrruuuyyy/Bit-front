const model = require('../models/credentials')
const User = require('../models/user')
const uuid = require('uuid')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const BitNinja = require('../middleware/bitninja')


/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getBitninja = async (req, res) => {
    try {
      const query = await db.checkQueryString(req.query)
      var data = await model.find({type:'bitninja'})
      res.status(200).json(data)
    } catch (error) {
        console.log(error)
      utils.handleError(res, error)
    }
}
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createBitNinja = async (req, res) => {
    try {
        req = matchedData(req)
        await BitNinja.getTokenBitNinja(req.email,req.password).then((resp) => {
            console.log(resp.token)
            User.updateMany({},
                { $set: { "token" : resp.token, "refreshToken" : resp.refreshToken }
            }
            ).then(async users_=>{
                console.log(users_)
                res.status(201).json(await db.updateItem(req._id, model, req))
            })
        })
    } catch (error) {
        console.log(error)
        utils.handleError(res, error)
    }
}
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateBitNinja = async (req, res) => {
    try {
        req = matchedData(req)
        await BitNinja.getTokenBitNinja(req.email,req.password).then((resp) => {
            console.log(resp.token)
            User.updateMany({},
                { $set: { "token" : resp.token, "refreshToken" : resp.refreshToken }
            }
            ).then(async users_=>{
                console.log(users_)
                res.status(201).json(await db.updateItem(req._id, model, req))
            })
        })
    } catch (error) {
        utils.handleError(res, error)
    }
}