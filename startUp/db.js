const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/movies', {
    useNewUrlParser: true
    })
    .then(()=> winston.info("Connection established with mongodb..."))
    .catch(err => console.error("Connection with database failed...", err));
}