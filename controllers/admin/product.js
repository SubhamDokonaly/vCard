const db = require("../../utils/mongo")
const logger = require("../../utils/logger")(__filename)

const insertProduct = async (req, res) => {
    try {
        let data, productData, insertProductData
        data = { status: 0, response: "Something went wrong" }
        productData = req.body

        if (Object.keys(productData).length === 0 && productData.data === undefined) {

            return res.send(data)
        }
        productData = productData.data[0]
        productData.systemInfo = req.rawHeaders
        insertProductData = db.insertSingleDocument("product", productData)
        if (Object.keys(insertProductData).length !== 0) {

            return res.send({ status: 1, response: "Product data inserted sucessfully" })
        }

    } catch (error) {
        logger.error(`Error in product Controller : insertProduct  - ${error}`)
        return res.send({ status: 0, response: error.message })
    }
}

module.exports = { insertProduct }