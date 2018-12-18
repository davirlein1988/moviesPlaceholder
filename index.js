const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


const genres = [
    {id: 1, genre: 'comedy'},
    {id: 2, genre: 'action'},
    {id: 3, genre: 'drama'}
]

app.get('/', (req, res) => {
    res.send("Hello, this is the root for movie services");
});
//Get all genres

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//Get a genre by id
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with given ID was not found");
    res.send(genre);
} );

//Post request for genres
app.post("/api/genres/", (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    };
    genres.push(genre);
    res.send(genre);
});


//validation with Joi
function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}

//Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})