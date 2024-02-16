const db = require("../../utils/mongo")

const insertUserDetails = async (req, res) => {
    try {
        let data, productData, insertProductData
        data = { status: 0, response: "Something went wrong" }
        productData = req.body

        if (Object.keys(productData).length === 0 && productData.data === undefined) {

            return res.send(data)
        }
        productData = productData.data[0]
        productData.systemInfo = req.rawHeaders
        insertProductData = await db.insertSingleDocument("userDetail", productData)
        if (Object.keys(insertProductData).length !== 0) {

            return res.send({ status: 1, response: "userDetails data inserted sucessfully" })
        }
    } catch (error) {
        logger.error(`Error in product Controller : insertProduct  - ${error}`)
        return res.send({ status: 0, response: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        let data, productData, updateProductData
        data = { status: 0, response: "Something went wrong" }
        productData = req.body

        if (Object.keys(productData).length === 0 && productData.data === undefined) {

            return res.send(data)
        }
        productData = productData.data[0]
        productData.systemInfo = req.rawHeaders
        // productData.image = 
        updateProductData = await db.findByIdAndUpdate("userDetail", productData.id, productData)
        if (updateProductData.matchedCount !== 0 && updateProductData.modifiedCount !== 0) {

            return res.send({ status: 1, response: "Updated Successfully" })
        }
    } catch (error) {
        logger.error(`Error in product Controller : updateProduct  - ${error}`)
        return res.send({ status: 0, response: error.message })
    }
}