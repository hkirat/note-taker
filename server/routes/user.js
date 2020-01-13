let express = require('express');
let router = express.Router();
//let {User} = require('../db/models/UserSchema')
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
    if(!validateEmail(req.body.email)) {
        return res.status(401).json({msg: "Email address format is incorrect"});
    }
    let token = jwt.sign({ email: req.body.email }, config.JWTsecret, {});
    userModel.register()
        .then((userAcc) => {
            sendMail(req.body.email, `Please validate your account ${config.server}/activate/${token}/${req.body.username}`, function(err) {
                    if(err) {
                        res.status(401).json({message: "Error while sending verification mail, please try again"});
                    }
                    res.json({message: "Validate your account. Please check your email"})
                });
        })
        .catch((err) => {
            res.status(404).json({});
        })
})

router.post('/signIn', [userExists, passport.authenticate('local')], function(req, res) {
    let token = jwt.sign({
        _id: req.user._id
    }, config.JWTsecret, {});
    res.send({message:'You are logged in', user: trimUser(req.user), token:token})
})

module.exports = router;