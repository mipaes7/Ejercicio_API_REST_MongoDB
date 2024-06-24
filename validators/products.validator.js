const { body, param, query } = require("express-validator");

const validateCreateProduct = [
    body("title")
        .exists().withMessage("Title is required")
        .isString().withMessage("Title should be string"),
    body("price")
        .exists().withMessage("Price is required")
        .isNumeric().withMessage("Price should be string"),
    body("description")
        .exists().withMessage("Description is required")
        .isString().withMessage("Description should be string"),
    body("image")
        .exists().withMessage("Image is required")
        .isString().withMessage("Image should be string"),
];

const validateUpdateProduct = [
    query("title")
        .optional()
        .isString().withMessage("Title should be string"),
    body("title")
        .optional()
        .isString().withMessage("Title should be string"),
    body("price")
        .optional()
        .isNumeric().withMessage("Price should be string"),
    body("description")
        .optional()
        .isString().withMessage("Description should be string"),
    body("image")
        .optional()
        .isString().withMessage("Image should be string"),
    body("provider")
        .optional()
        .isString().withMessage("Provider should be string"),
    body("isActive")
        .optional()
        .isBoolean({ strict: true }).withMessage("isActive should be a boolean")
];

const validateDeleteProduct = [
    query('title').notEmpty().withMessage("Valid title is required")
];

module.exports = {
    validateCreateProduct,
    validateUpdateProduct,
    validateDeleteProduct
};