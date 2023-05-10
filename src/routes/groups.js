const router = require('express').Router();
let Group = require('../models/group.model');

// GET /groups/
router.route('/').get((req, res) => {
    Group.find()
        .then(groups => res.json(groups))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST /groups/add
router.route('/add').post((req, res) => {
    console.log(req.body)
    const members = req.body.members;

    const newGroup = new Group({members});

    newGroup.save()
        .then(() => res.json('Group added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;