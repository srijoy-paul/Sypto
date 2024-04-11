const { body, validationResult, validationChain } = require('express-validator');

const handleValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    next();
};


const validateBuyOrderRequest = [
    body("market").isString().notEmpty().withMessage("market field is required."),
    body("pricePerUnit").isString().notEmpty().withMessage("price per unit is required."),
    body("totalQuantity").isNumeric().withMessage("quantity should be a number"),
    handleValidationErrors
];

const validateSellOrderRequest = [
    body("market").isString().notEmpty().withMessage("market field is required."),
    body("pricePerUnit_toSell").isString().notEmpty().withMessage("price per unit is required."),
    body("totalQuantity_toSell").isNumeric().withMessage("quantity should be a number"),
    handleValidationErrors,
];
module.exports = { validateBuyOrderRequest, validateSellOrderRequest };