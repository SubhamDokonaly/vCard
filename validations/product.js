//Imports
const { check, validationResult } = require('express-validator')

let data = { status: 0, response: 'Invalid Request' }

const insertProduct = [
    check('data').notEmpty().withMessage('Data cannot be empty'),
    check('data.*.').trim().notEmpty().withMessage('Id is required field'),
    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            data.response = errors[0].msg;

            return res.send(data);
        }

        return next();
    }
]

module.exports = {insertProduct}
