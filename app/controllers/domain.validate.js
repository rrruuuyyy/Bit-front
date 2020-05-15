const { validationResult } = require('../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
exports.createItem = [
    check('user')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY')
      .trim(),
    check('path')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY')
      .trim(),
    (req, res, next) => {
      validationResult(req, res, next)
    }
  ]
  
  /**
   * Validates update item request
   */
  exports.updateItem = [
    check('user')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY')
      .trim(),
    check('path')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY')
      .trim(),
    (req, res, next) => {
      validationResult(req, res, next)
    }
  ]
  
  /**
   * Validates get item request
   */
  exports.getItem = [
    check('id')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY'),
    (req, res, next) => {
      validationResult(req, res, next)
    }
  ]
  
  /**
   * Validates delete item request
   */
  exports.deleteItem = [
    check('id')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY'),
    (req, res, next) => {
      validationResult(req, res, next)
    }
  ]