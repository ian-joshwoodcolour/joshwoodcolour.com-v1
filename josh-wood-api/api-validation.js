/**
 * @prettier
 */
const {matchedData, sanitize} = require('express-validator/filter');

const returnBadResponse = (response, errors, statusCode = 400) => {
    return response.status(statusCode).json({errors});
};

const handleValidationErrors = (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return returnBadResponse(response, errors.mapped());
    } else {
        next();
    }
};

const isValidEmailAddress = () => {
    return check('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim()
        .normalizeEmail();
};

const isNonEmptyGenericString = (field, errorMessage, min = 2, max = 1500) => {
    return check(field)
        .isLength({min, max})
        .withMessage(errorMessage)
        .trim();
};

module.exports = {
    handleValidationErrors,
    isValidMailChimpRequest: [isValidEmailAddress()],
    isValidZenDeskRequest: [
        isValidEmailAddress(),
        isNonEmptyGenericString('first_name', 'Please enter your first name'),
        isNonEmptyGenericString('last_name', 'Please enter your last name'),
        isNonEmptyGenericString('subject', 'Please select your subject'),
        isNonEmptyGenericString('description', 'Please enter your description', 10)
    ],
    returnBadResponse
};
