let jwt = require('jsonwebtoken');
let config  = require('../config/config');
let notesModel = require('../db/model/notes')
let emailMessage = require('./Email.js')
let isEmail = require('is-email')
let {User} = require('../db/model/UserSchema');
let nodemailer = require("nodemailer")
function validateEmail(email) {
    return isEmail(email)
}

function trimUser(user) {
	return Object.assign({}, {first_name: user.first_name, email: user.username});
}

function trimNotes(notes, user_id) {
	return notes.map((note) => {
		if(note.members.includes(user_id)) {
			return {title: note.title, hasAccess: true, slug: note.slug}
		}
		return {title: note.title, hasAccess: false, slug: note.slug}
	})
}

function userExists(req, res, next) {
	if (!validatePassword(req.body.password).success) {
        return res.status(401).json({msg: "Password format is incorrect"});
    }
    if(!validateEmail(req.body.username)) {
        return res.status(401).json({msg: "Email address format is incorrect"});
    }
    User.findOne(
        {username: req.body.username},
        (err, userAcc) => {
            if(userAcc === null) {
                return res.status(401).json({msg:'Email Id does not exists. Please sign up to continue.', user: userAcc})
            } else if(userAcc.active == false) {
                return res.status(401).json({msg:"Validate your account before sign in. Please check your email.", user: null})
            } 
            return next();
        }
    );
}


function ensureAuthenticated(req, res, next) {
	let token = req.body.token || req.query.token;
	req.user = false; 
    if (!token) {
    	return res.status(403).json({});
	}
    jwt.verify(token, config.JWTsecret, function(err, user) {
        if (err) {
        	return res.status(403).json({msg: "Error while authenticating request, please sign in again"});
        }
        req.user = user;
        return next();
	})
}

function extractUserid(req, res, next) {
	let token = req.body.token || req.query.token;
	req.user = null; 
    if (!token) {
    	return next()
	}
    jwt.verify(token, config.JWTsecret, function(err, user) {
        if (err) {
        	return next()
        }
        req.user = user;
        return next();
	})
}

function extractUser(req, res, next) {
	let token = req.body.token || req.query.token;
	req.user = null; 
    if (!token) {
    	return res.status(403).json({});
	}
    jwt.verify(token, config.JWTsecret, function(err, user) {
        if (err) {
	    	return res.status(403).json({});
        }
        User.findOne({_id: user._id}, (err, userAcc) => {
	            if(userAcc === null) {
	                return res.status(403).json({});
	            }
	            req.user = userAcc;
	            return next();
	        }
	    );
	})
}

// test authentication
function ensureHasNoteAccess(req, res, next) {
	let note_id = req.body.note_id;
	let token = req.body.token; 
	req.hasAccess = false
	if(!note) {
		return res.status(404).json({msg: "Invalid node id"});
	}
    if (!token) {
    	return res.status(403).json({});;
	}
	jwt.verify(token, config.JWTsecret, function(err, user) {
        if (err) {
        	return next();
        }
        notesModel.hasAccess(req.body.notes_id, user._id)
			.then((access) => {
				if(access) {
					req.hasAccess = true;
				}
				return next();
			})
			.catch((err) => {
    			return res.status(403).json({});;
			})
	})
	
}

function validatePassword(pass) {
	if(!pass || pass.length < 6) {
		return {success: false}
	}
	return {success: true}
}

function passwordValidator(req, res, next) {
    if (!req.body.old_password) {
        res.send({message:'Old password can not be empty.', success: false})
    } else if (!req.body.new_password) {
        res.send({message:'New password can not be empty.', success: false})
    } else if (!req.body.confirm_password) {
        res.send({message:'Confirm Password field can not be empty.', success: false})
    } else if (req.body.new_password !== req.body.confirm_password) {
        res.send({message:'The two passwords do not match', success: false})
    } else {
    	next();
	}
}

function sendMail(email, msg, link, cb) {
   let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: config.adminEmail, // generated ethereal user
	        pass: config.emailPass // generated ethereal password
	    }
	});

	let mailOptions = {
	    from: config.nodemailerEmail,
	    to: email,
	    subject: msg,
	    html: emailMessage(link, msg)
	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	    	return cb(error);
	    }
	    cb(null, info.messageId);
	});
 
}

function getRandomString(len) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = {extractUser, trimNotes, extractUserid, trimUser, userExists, validateEmail, validatePassword, ensureAuthenticated, ensureHasNoteAccess, getRandomString, passwordValidator, sendMail};
