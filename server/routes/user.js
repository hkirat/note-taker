let express = require('express');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config/config');
let userModel = require('../db/model/user');
let ensureAuthenticated = require('../Globals/auth').ensureAuthenticated;
let ensureHasAccess = require('../Globals/auth').ensureHasCourseAccess;
let passwordValidator = require('../Globals/auth').passwordValidator;
let sendMail = require('../Globals/auth').sendMail;
let validatePassword = require('../Globals/auth').validatePassword;
let validateEmail = require('../Globals/auth').validateEmail;
let trimUser = require('../Globals/auth').trimUser;
let userExists = require('../Globals/auth').userExists;

/*
router.put('/changePassword' , [passwordValidator, ensureAuthenticated, passport.authenticate('local')], function(req, res) {
    User.findByUsername(req.body.username).then(function(userAcc){
        if (userAcc){
            userAcc.setPassword(req.body.new_password, function(){
                userAcc.save();
                res.send({message:"Password Changed."});
            });
        } else {
            res.status(400).send({message:"Something went wrong. Please try again later"});
        }
    },function(err){
        res.status(400).send({message:"Something went wrong. Please try again later"});
    })
});
*/

router.post('/signUp', function(req, res) {
    if (!validatePassword(req.body.password).success) {
        return res.status(401).json({msg: "Password format is incorrect"});
    }
    if(!validateEmail(req.body.username)) {
        return res.status(401).json({msg: "Email address format is incorrect"});
    }
    if(!req.body.first_name || !req.body.last_name) {
        return res.status(401).json({msg: "Please provide first and last name"});        
    }
    let token = jwt.sign({ username: req.body.username }, config.JWTsecret, {});
    userModel.register(req.body.username, req.body.password, req.body.first_name, req.body.last_name)
        .then((userAcc) => {
            sendMail(req.body.username, `Please validate your account`, `${config.frontendUrl}/activate/${token}/${req.body.username}`, function(err) {
                    if(err) {
                        return res.status(401).json({msg: "Error while sending verification mail, please try again"});
                    }
                    res.json({msg: "Validate your account. Please check your email"})
                });
        })
        .catch((err) => {
            res.status(404).json({msg: err.message});
        })
})

router.post('/signIn', [userExists, passport.authenticate('local')], function(req, res) {
    let token = jwt.sign({
        _id: req.user._id
    }, config.JWTsecret, {});
    res.send({message:'You are logged in', user: trimUser(req.user), token})
})

router.post('/activate', function(req, res) {
    let token = req.body.token;
    let username = req.body.username;
    if(!token || !username) {
        return res.status(404);
    }
    
    jwt.verify(token, config.JWTsecret, function(err, decoded) { // using the token we passed to authonticate the account
        if (err || decoded.username != username) return res.status(404).send({ msg: 'Failed to authenticate token.' });
        console.log("hi there:");
        userModel.activate(username)
            .then((userAcc) => {
                res.json({success: true, user: trimUser(userAcc), token: jwt.sign({
                    _id: userAcc._id
                }, config.JWTsecret, {})});
            })
            .catch((err) => {
                return res.status(404);
            })
    })
})

router.get('/', [ensureAuthenticated], function(req, res) {
    res.json({user: trimUser(req.user)});
})

module.exports = router;