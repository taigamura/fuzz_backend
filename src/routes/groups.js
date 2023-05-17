const router = require('express').Router();
let Group = require('../models/group.model');

let User = require('../models/user.model');

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

/**
 * POST /groups/addUserToGroup/:id
 * @param adds User to Group with id :id
 */
router.route('/addUserToGroup/:id').post((req, res) => {
    console.log(req.body)

    var members = req.body.members

    // add memberId to group
    Group.findById(req.params.id)
        .then(group => {
            group.members = group.members.concat(members);

            group.save()
                .then(() => res.json('Group updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    
    // add groupId to member
    members.forEach(memberId => {
        User.findById(memberId)
            .then(user => {
                user.groups = user.groups.push(req.params.id)
                
                user.save()
                    .then(() => res.json('Group updated for member!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });

});

module.exports = router;