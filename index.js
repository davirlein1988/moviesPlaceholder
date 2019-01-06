const winston = require('winston');
const express = require('express');
const app = express();

require('./startUp/loggin');
require('./startUp/routes')(app);
require('./startUp/db')();
require('./startUp/config')();
require('./startUp/validation')();


//Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
})