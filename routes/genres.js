//const asyncMiddleware = require('../middleware/async')
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();





//Get all genres

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);    
});

//Get a genre by id
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send("The genre with given ID was not found");

    res.send(genre);
} );

//Post request for genres
router.post("/", auth,  async (req, res) => {
    const token = req.header('x-auth-token');
    res.status(401);

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({ name: req.body.name}); 
    await genre.save();
    res.send(genre);
});

//Put request
router.put('/:id',auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new : true});

    if(!genre) return res.status(404).send("The genre with given ID was not found");

    res.send(genre);

});

//delete request

router.delete('/:id', [auth, admin],async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if(!genre) return res.status(404).send("The genre with given ID was not found");   
    
    res.send(genre);
});




module.exports = router;