//Imports
const logger = require("../utils/logger")(__filename)

module.exports = (app) => {
    try {
        // const adminValidation = require("../validation/admin/admin")

        // import controller
        const productController = require('../controllers/admin/product')

        //products APIs
        app.post('/admin/insertProduct', productController.insertProduct)

    } catch (e) {
        logger.error(`Error in admin route: ${e.message}`)
    }
};