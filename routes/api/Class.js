const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

//Load Class  models
const Class = require('../../models/Class');
  
// @description get specific class when we click during registration
// @access private
router.get('/:id',passport.authenticate('jwt', {session: false}), (req,res) => {
    const errors = {};
    Class.findById(req.params.id)
    .then(classes => {
        if(!classes){
            errors.noclasses = 'No class exists with this id';
            return res.status(404).json(errors);
        }else{
            res.json(classes);
        }
    })
    .catch(err => res.status(404).json(err));
});


// @description get all classes (for displaying in enrollment)
// @access public



router.post('/addclass',passport.authenticate('jwt', {session: false}),(req, res) => {
    //check validation
    const errors ={};
    Class.findOne({ name: req.body.name})
    .then(classes => {
        if(classes){
            errors.name = 'Name already exists';
            return res.status(400).json(errors);
        }
        else{
            const newClass = new Class({
                name : req.body.name,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            });
                newClass
                    .save()
                    .then(classes => res.json(classes))
                    .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
});


module.exports = router;