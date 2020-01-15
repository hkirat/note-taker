let express = require('express');
let router = express.Router();
//let {User} = require('../db/models/UserSchema')
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config/config');
let notesModel = require('../db/model/notes');
let ensureAuthenticated = require('../Globals/auth').ensureAuthenticated;
let ensureHasAccess = require('../Globals/auth').ensureHasCourseAccess;
let passwordValidator = require('../Globals/auth').passwordValidator;
let sendMail = require('../Globals/auth').sendMail;
let validatePassword = require('../Globals/auth').validatePassword;
let validateEmail = require('../Globals/auth').validateEmail;
let trimUser = require('../Globals/auth').trimUser;
let userExists = require('../Globals/auth').userExists;
let extractUserid = require('../Globals/auth').extractUserid;
let getRandomString = require('../Globals/auth').getRandomString;
let trimNotes = require('../Globals/auth').trimNotes;

router.post('/', [ensureAuthenticated], function(req, res) {
    console.log(req.user);
    notesModel.insert(req.body.title, req.body.note, req.user._id, getRandomString(6))
        .then((note) => {
            res.json({note});
        })
        .catch((err) => {
            res.status(403).json({});
        })
})

router.get('/', [ensureAuthenticated], function(req, res) {
    notesModel.get(req.body.slug, req.user._id)
        .then((note) => {
            if(note) {
                return res.json({note})
            }
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