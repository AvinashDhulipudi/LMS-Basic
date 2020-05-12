const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

//Load Class  models
const User = require('../../models/Users');

// user add a new class
//case: 1 We have to know if user is registered in the course
router.post('/:class_id',passport.authenticate('jwt', {session: false}),(req, res) => {
    //check validation
    User.findById(req.user.id)
        .then(users => {
            users.class.remove(req.params.class_id);
                users
                    .save()
                    .then(users => res.json(users.class))
                    .catch(err => console.log(err));
            })
    .catch(err => console.log(err));
});

module.exports = router;