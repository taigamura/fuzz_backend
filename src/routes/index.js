const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send("Sup, World!");
});

module.exports = router;