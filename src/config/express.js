const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const authRoute = require('../routes/auth');
const postRoute = require('../routes/post');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(jwt({ secret: 'avanade' }).unless({ path: ['/auth', '/auth/verifyToken'] }));
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(403).send({ error: 403, message: 'Unauthorized access' });
    }
});

app.use('/auth', authRoute);
app.use('/post', postRoute);

module.exports = app;