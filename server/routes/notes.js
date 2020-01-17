let express = require('express');
let router = express.Router();
//let {User} = require('../db/models/UserSchema')
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config/config');
let notesModel = require('../db/model/notes');
let userModel = require('../db/model/user');
let ensureAuthenticated = require('../Globals/auth').ensureAuthenticated;
let ensureHasAccess = require('../Globals/auth').ensureHasCourseAccess;
let passwordValidator = require('../Globals/auth').passwordValidator;
let sendMail = require('../Globals/auth').sendMail;
let validatePassword = require('../Globals/auth').validatePassword;
let validateEmail = require('../Globals/auth').validateEmail;
let trimUser = require('../Globals/auth').trimUser;
let userExists = require('../Globals/auth').userExists;
let extractUserid = require('../Globals/auth').extractUserid;
let extractUser = require('../Globals/auth').extractUser;
let getRandomString = require('../Globals/auth').getRandomString;
let trimNotes = require('../Globals/auth').trimNotes;

router.post('/', [ensureAuthenticated], function(req, res) {
    notesModel.insert(req.body.title, req.body.note, req.user._id, getRandomString(6))
        .then((note) => {
            res.json({note});
        })
        .catch((err) => {
            res.status(403).json({});
        })
})

router.put('/', [ensureAuthenticated], function(req, res) {
    notesModel.update(req.body.title, req.body.note, req.user._id, req.body.slug)
        .then((note) => {
            res.json({note});
        })
        .catch((err) => {
            res.status(403).json({});
        })
})

router.put('/approve', [ensureAuthenticated], function(req, res) {
    userModel.getFromEmail(req.body.email)
        .then((newUser) => {
            return notesModel.approve(req.body.slug, newUser._id, req.user._id);        
        })
        .then((note) => {
            res.json({});
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({});
        })
})

router.get('/', [ensureAuthenticated], function(req, res) {
    notesModel.get(req.query.slug, req.user._id)
        .then((note) => {
            if(note) {
                return res.json({note})
            }
            res.status(404).json({});
        })
})

router.post('/request', [extractUser], function(req, res) {
    //TODO:: Send out mail to admins
    notesModel.request(req.body.slug, req.user._id, req.user.username)
        .then((note) => {
            console.log(note);
            return res.json({});
        })
        .catch((err) => {
            res.status(404).json({});  
        })
})

router.get('/gated', [extractUserid], function(req, res) {
    notesModel.getAll()
        .then((notes) => {
            return res.json({notes: trimNotes(notes, (req.user ? req.user._id : ""))})
        })
})

module.exports = router;