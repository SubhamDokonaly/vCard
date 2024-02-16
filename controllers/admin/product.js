const db = require("../../utils/mongo")
const logger = require("../../utils/logger")(__filename)
const { uploadToAws, getSignedUrl } = require("../../utils/aws")

const insertProduct = async (req, res) => {
    try {
        let data, productData, insertProductData, productImage
        data = { status: 0, response: "Something went wrong" }
        productData = req.body

        productData.systemInfo = req.rawHeaders
        productImage = await uploadToAws(
            "Vcard",
            "productsImage",
            req.files.image
        );
        productData.image = productImage[0]
        insertProductData = await db.insertSingleDocument("product", productData)
        if (Object.keys(insertProductData).length !== 0) {

            return res.send({ status: 1, response: "Product data inserted sucessfully" })
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

        // if (Object.keys(productData).length === 0 && productData.data === undefined) {

        //     return res.send(data)
        // }
        // productData = productData.data[0]
        productData.systemInfo = req.rawHeaders
        if (
            Array.isArray(req.files.image) ||
            req.files.image != null
        ) {
            productData.image = await uploadToAws(
                "Vcard",
                "productsImage",
                req.files.image
            );
        } else {
            delete updateDisposalDetails.reOpenUploadOrder;
        }
        // productData.image = 
        updateProductData = await db.findByIdAndUpdate("product", productData.id, productData)
        if (updateProductData.matchedCount !== 0 && updateProductData.modifiedCount !== 0) {

            return res.send({ status: 1, response: "Updated Successfully" })
        }
    } catch (error) {
        logger.error(`Error in product Controller : updateProduct  - ${error}`)
        return res.send({ status: 0, response: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        let data, idData, getProductData
        data = { status: 0, response: "Something went wrong" }
        idData = req.body

        if (Object.keys(idData).length === 0 && idData.data === undefined) {

            return res.send(data)
        }
        idData = idData.data[0]
        getProductData = await db.getSingleDataById("product", idData.id, { systemInfo: 0 })
        if (getProductData !== null) {
            getProductData.image = await getSignedUrl(getProductData.image.href)

            return res.send({ status: 1, data: JSON.stringify(getProductData) })
        } else {
            return res.send({ status: 1, data: JSON.stringify([]) })
        }
    } catch (error) {
        logger.error(`Error in product Controller : getProductById  - ${error}`)
        return res.send({ status: 0, response: error.message })
    }
}

const getAllProduct = async (req, res) => {
    try {
        getProductData = await db.findDocuments("product", {}, { systemInfo: 0 })
        if (getProductData) {
            getProductData.image = await Promise.all(
            getProductData.map(async (el) => {
                el.image = await getSignedUrl(el.image.href)
            })
            )
            return res.send({ status: 1, data: getProductData })
        }
    } catch (error) {
        logger.error(`Error in product Controller : getProductById  - ${error}`)
        return res.send({ status: 0, response: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let data, idData, deleteProductData
        data = { status: 0, response: "Something went wrong" }
        idData = req.body

        if (Object.keys(idData).length === 0 && idData.data === undefined) {

            return res.send(data)
        }
        idData = idData.data[0]
        deleteProductData = await db.findByIdAndUpdate("product", idData.id, { status: 0 })
        if (deleteProductData !== null && Object.keys(deleteProductData).length !== 0) {

            return res.send({ status: 1, response: "Deleted Successfully" })
        }
        return res.send(data)
    } catch (error) {
        logger.error(`Error in product Controller : deleteProduct  - ${error}`)
        return res.send({ status: 0, response: error.message })
    }
}

module.exports = { insertProduct, updateProduct, getProductById, getAllProduct, deleteProduct }