const router = require('express').Router();
const repository = require('../repositories/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/config').secret;

router.post('/', (req, res) => {
    repository.findByCredentials(req.body.email, req.body.password)
        .then(user => {
            console.log(user);
            if (!user) {
                res.status(401).json({ error: 401, message: 'Unauthorized acess' });
                return;
            }
            const token = jwt.sign({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }, secret, { expiresIn: 3600 });
            res.json({ token });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send();
        });
});

router.post('/verifyToken', (req, res) => {
    jwt.verify(req.body.token, secret, function(error) {
        if (error) {
            res.json({ error: 'Invalid or expired token' });
            return;
        }
        res.json({ success: 'Valid token' });
    });
});

module.exports = router;