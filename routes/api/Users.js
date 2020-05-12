const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

//load input validation

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login'); 

//Load user module
const Class = require('../../models/Class');
const User = require('../../models/Users');
const keys = require('../../config/keys');


// router.get('/test',(req,res) => res.json({msg: "users works"}));

// @routes GET api/users/register
// @description register a user
// @access public
router.post('/register',(req, res) => {
    //check validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email})
    .then(user => {
        if(user){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }
        else{
            const avatar = gravatar.url(req.body.email,{
                s: '200', //size
                r: 'pg', // rating
                d: 'mm' //default
            })
            const newUser = new User({
                name : req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    })
    .catch(err => console.log(err));
});

// @routes GET api/users/login
// @description login user/ jwt token
// @access public

router.post('/login',(req,res)=>{
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
    .then(user=>{
        //check user
        if(!user){
            errors.email = 'user not found';
            return res.status(404).json(errors);
        }
        //check password
        bcrypt.compare(password,user.password)
        .then(isMatch => {
            if(isMatch){
                //user matched
                const payload = {id: user.id, name: user.name, avatar: user.avatar}     // create JWT payload
                //sign token
                jwt.sign(payload, 
                    keys.secrectOrKey,
                    { expiresIn: 3600 },
                    (err,token)=>{
                        res.json({
                            sucess: true,
                            token: 'Bearer ' + token
                        })
                });
            } else{
                errors.password = 'password incorrect';
                return res.status(400).json(errors);
            }
        })
    });
});

// @routes GET api/users/current
// @description return current user
// @access private

router.get('/current',passport.authenticate('jwt', {session: false}),(req,res)=>{
    res.json({
        id: req.user.id,
        emai: req.user.email,
        name: req.user.name
    });
});


// get all enrolled classes
//private
//get /users/enrolled

router.get('/enrolled',passport.authenticate('jwt', {session: false}),(req,res) => {
    const errors ={};
    User.findById(req.user.id)
        .then(user => {
            Class.find()
            .populate('class')
            .then(classes => {
                if(!classes){
                    errors.noclasses = 'There are no classes enrolled';
                    res.status(404).json(errors);
                } else {
                    const arr = [];
                    for(j=0;j<user.class.length;j++){
                        for(i=0;i<classes.length;i++){
                            if(user.class[j] == classes[i].id){
                                arr.push(classes[i]);
                                break;
                            }
                        }
                    }
                    res.status(200).json(arr);
                }
            })
            .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
    });


// get all unenrolled classes
//private
//get /users/remaining

router.get('/remaining',passport.authenticate('jwt', {session: false}),(req,res) => {
    const errors ={};
    User.findById(req.user.id)
        .then(user => {
            Class.find()
            .populate('class')
            .then(classes => {
                if(!classes){
                    errors.noclasses = 'There are no classes';
                    res.status(404).json(errors);
                } else {
                    for(j=0;j<user.class.length;j++){
                        for(i=0;i<classes.length;i++){
                            if(classes[i].id == user.class[j]){
                                classes.splice(i, 1);
                                break;
                            }
                        }
                    }
                    res.status(200).json(classes);
                }
            })
            .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
    });

    
module.exports = router;