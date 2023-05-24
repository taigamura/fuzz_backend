const router = require('express').Router();
let Group = require('../models/group.model');

let User = require('../models/user.model');

function remove_value_from_array(array, value) {
    var index = array.indexOf(value);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array
}

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
            
            members.forEach(memberId => {
                group.members = group.members.concat(memberId);
                
                // add groupId to member
                User.findById(memberId)
                    .then(user => {
                        user.groups = user.groups.concat(group._id)
                        
                        user.save()
                            .then(() => res.json('addUserToGroup Complete'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            
            group.save()
            .then(() => console.log("group saved"))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * POST /groups/removeUserFromGroup/:id
 * @param remove User from Group with id :id
 */
router.route('/removeUserFromGroup/:id').post((req, res) => {
    console.log(req.body)

    var members = req.body.members

    // add memberId to group
    Group.findById(req.params.id)
        .then(group => {
            
            copy_group_members = group.members
            members.forEach(memberId => {
                
                copy_group_members = remove_value_from_array(copy_group_members, memberId)
                
                User.findById(memberId)
                    .then(user => {
                        user.groups = remove_value_from_array(user.groups, group._id);
                        
                        user.save()
                            .then(() => res.json('removeUserFromGroup Complete'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            })

            group.members = copy_group_members;
            
            group.save()
            .then(() => console.log("group saved"))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;