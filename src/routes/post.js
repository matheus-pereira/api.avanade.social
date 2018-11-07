const router = require('express').Router();
const repository = require('../repositories/post');

router.get('/:id', (req, res) => {
    repository.findById(req.params.id)
        .then(data => {
            console.log(data);
            res.send();
        })
        .catch(error => {
            console.log(error);
            res.status(500).send();
        });
});

router.get('/timeline', (req, res) => {
    repository.findById(req.params.id)
        .then(data => {
            console.log(data);
            res.send();
        })
        .catch(error => {
            console.log(error);
            res.status(500).send();
        });
});

module.exports = router;