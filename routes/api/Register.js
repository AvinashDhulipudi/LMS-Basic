const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

//Load Class  models
const Class = require('../../models/Class');
const User = require('../../models/Users');

// user add a new class
//case: 1 We have to know if user is registered in the course
router.post('/:class_id',passport.authenticate('jwt', {session: false}),(req, res) => {
    //check validation
    Class.findById(req.params.class_id)
    .then(classes => {
        User.findById(req.user.id)
            .then( users => {
                users.class.push(classes);
                users
                    .save()
                    .then(users => res.json(users.class))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
    .catch(err => console.log(err));
});

module.exports = router;