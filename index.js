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


//Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})