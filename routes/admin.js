//Imports
const logger = require("../utils/logger")(__filename)

module.exports = (app) => {
    try {
        const productValidation = require("../validations/product")

        // import controller
        const productController = require('../controllers/admin/product')

        //products APIs
        app.post('/admin/insertProduct', productValidation.insertProduct, productController.insertProduct)
        app.post('/admin/updateProductById', productValidation.updateProduct, productController.updateProduct)
        app.post('/admin/getProductById', productValidation.checkId, productController.getProductById)
        app.post('/admin/deleteProduct', productValidation.checkId, productController.deleteProduct)
        app.get('/admin/getAllProduct',  productController.getAllProduct)

    } catch (e) {
        logger.error(`Error in admin route: ${e.message}`)
    }
};