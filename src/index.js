const express = require('./config/express');

const port = process.env.PORT || '3000';
const server = express.listen(port, function() {
    console.log('server started and listening at port ' + server.address().port);
});