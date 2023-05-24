const router = require('express').Router();
const { randomUUID } = require('crypto');
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
    const email = req.body.email;
    const display_name = req.body.display_name;
    const followers = req.body.followers;
    const image_url = req.body.image_url;
    const instagram_id = req.body.instagram_id;
    const groups = req.body.groups;
    const joined_date = req.body.joined_date;
    const age = req.body.age;
    const gender = req.body.gender;

    const newUser = new User({email, display_name, followers, image_url, instagram_id, groups, joined_date, age, gender});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * POST /groups/:id
 * @param remove User with id :id
 */
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;