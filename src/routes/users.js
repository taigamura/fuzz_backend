const router = require('express').Router();
let User = require('../models/user.model');

// GET /users/
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST /users/add
router.route('/add').post((req, res) => {
    console.log(req.body)
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;