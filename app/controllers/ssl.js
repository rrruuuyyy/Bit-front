const model = require('../models/ssl')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const auth = require('../controllers/auth')
var fs = require('fs');
const path = `./uploads`;
var AdmZip = require('adm-zip');

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
    var user = await auth.getUserFromBearerToken(req.headers.authorization)
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
    var name = `${user._id}_${new Date().getTime()}`;
    var name_fileCsr = `${name}.csr`
    var name_fileKey = `${name}.key`  
    let file_csr = req.files.file_csr;
    let file_key = req.files.file_key;
    await file_csr.mv(`${path}/${name_fileCsr}`, function(err) {
      if (err)
      return res.status(500).send(err);
    });
    await file_key.mv(`${path}/${name_fileKey}`, function(err) {
      if (err)
      return res.status(500).send(err);
    });
    req = matchedData(req)
    req.user_id = user._id
    req.name_file = name
    console.log(req)
    // res.status(201).json([])  
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
    var user = await auth.getUserFromBearerToken(req.headers.authorization)
    const id = await utils.isIDGood(req.params.id) // Id del archivo previamene subido
    var data = matchedData(req);
    if( data.change_file ){
      var name = `${user._id}_${new Date().getTime()}`;
      var name_fileCsr = `${name}.csr`
      var name_fileKey = `${name}.key`  
      let file_csr = req.files.file_csr;
      let file_key = req.files.file_key;
      // Obtener las extenciones de los arhivos y validar si son los correctos
      var ext_csr = await utils.getFileExtension(file_csr.name)
      var ext_key = await utils.getFileExtension(file_key.name)
      // Movemos los nuevos archivos
      await file_csr.mv(`${path}/${name_fileCsr}`, function(err) {
        if (err)
        return res.status(500).send(err);
      });
      await file_key.mv(`${path}/${name_fileKey}`, function(err) {
        if (err)
        return res.status(500).send(err);
      });
      var anterior = await model.findById(id)
      // Ahora eliminamos los archivos anteriores
      await fs.unlinkSync(`${path}/${anterior.name_file}.csr`, function(err) {
        if (err)
        return res.status(500).send(err);
      });
      await fs.unlinkSync(`${path}/${anterior.name_file}.key`, function(err) {
        if (err)
        return res.status(500).send(err);
      });
      data.name_file = name;
    }
    // Guardar cambios
    res.status(200).json(await db.updateItem(id, model, data))
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
    var files = await model.findById(id)
    // Ahora eliminamos los archivos anteriores
    await fs.unlinkSync(`${path}/${files.name_file}.csr`, function(err) {
      if (err)
      return res.status(500).send(err);
    });
    await fs.unlinkSync(`${path}/${files.name_file}.key`, function(err) {
      if (err)
      return res.status(500).send(err);
    });
    res.status(200).json(await db.deleteItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
/**
 * Download files item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.downloadItems = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    var files = await model.findById(id)
    // creating archives
    var zip = new AdmZip();
    // add local file
    zip.addLocalFile(`${path}/${files.name_file}.csr`,);
    zip.addLocalFile(`${path}/${files.name_file}.key`,);
    // get everything as a buffer
    var willSendthis = zip.toBuffer();
    res.writeHead(200, {'Content-disposition': 'attachment; filename=Ssl_files.zip"}'});
    res.end(willSendthis)
  } catch (error) {
    utils.handleError(res, error)
  }
}