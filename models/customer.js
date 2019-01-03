const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }, 
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {type: String, required: true, min: 10, max: 10}
}));

//validation with Joi
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(10).max(10).required()
    };
    return Joi.validate(customer, schema);
}


exports.Customer = Customer;
exports.validate = validateCustomer;