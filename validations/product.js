//Imports
const { check, validationResult } = require('express-validator')

let data = { status: 0, response: 'Invalid Request' }

const insertProduct = [
    check('name').trim().notEmpty().withMessage('name is required field'),
    check('brand').trim().notEmpty().withMessage('brand is required field'),
    check('price').trim().notEmpty().withMessage('price is required field'),
    check('discount').trim().notEmpty().withMessage('discount is required field'),
    check('description').trim().notEmpty().withMessage('decription is required field'),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.response = errors[0].msg;

            return res.send(data);
        }

        return next();
    }
]
const checkId = [
    check('data').notEmpty().withMessage('Data cannot be empty'),    
    check('data.*.id').trim().notEmpty().withMessage('id is required field').isMongoId().withMessage("Invalid Id"),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.response = errors[0].msg;

            return res.send(data);
        }

        return next();
    }
]
const updateProduct = [
    // check('data').notEmpty().withMessage('Data cannot be empty'),    
    check('id').trim().notEmpty().withMessage('id is required field').isMongoId().withMessage("Invalid Id"),
    check('name').trim().notEmpty().withMessage('name is required field'),
    check('brand').trim().notEmpty().withMessage('brand is required field'),
    check('price').trim().notEmpty().withMessage('price is required field'),
    check('discount').trim().notEmpty().withMessage('discount is required field'),
    check('description').trim().notEmpty().withMessage('decription is required field'),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.response = errors[0].msg;

            return res.send(data);
        }

        return next();
    }
]

module.exports = {insertProduct, updateProduct, checkId}
