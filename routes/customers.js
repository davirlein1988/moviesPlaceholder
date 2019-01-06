
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();



//Get all customers

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});


//Get a customer by id
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send("The user with given ID was not found");

    res.send(customer);
} );


//Post request for customers
router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const customer = new Customer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }); 
    await customer.save();
    res.send(customer);
});

//Put request for customer
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, {new : true});

    if(!customer) return res.status(404).send("The user with given ID was not found");

    res.send(customer);

});


//delete request

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if(!customer) return res.status(404).send("The user with given ID was not found");   
    
    res.send(customer);
});


module.exports = router;