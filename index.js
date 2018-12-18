const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


const genres = [
    {id: 1, genre: 'comedy'},
    {id: 2, genre: 'action'},
    {id: 3, genre: 'drama'}
]




//Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})