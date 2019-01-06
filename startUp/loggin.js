const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
module.exports = function(){
    winston.ExceptionHandler(
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}));
        process.on('unhandledRejection', (ex) => {
            throw ex;
        });

    winston.add(winston.transports.File, {filename: 'logfile.log'});
    winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/movies', level: 'info'});
    
}