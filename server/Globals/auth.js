let jwt = require('jsonwebtoken');
let config  = require('../config/config');
let notesModel = require('../db/model/notes')
let email = require('./Email.js')
let isEmail = require('is-email')
let {User} = require('../db/model/UserSchema');

function validateEmail(email) {
    return isEmail(email)
}

function trimUser(user) {
	return Object.assign({}, {first_name: user.first_name, email: user.email});
}

function userExists(req, res, next) {
	if (!validatePassword(req.body.password).success) {
        return res.status(401).json({msg: "Password format is incorrect"});
    }
    if(!validateEmail(req.body.email)) {
        return res.status(401).json({msg: "Email address format is incorrect"});
    }
    User.findOne(
        {username: req.body.username},
        (err, userAcc) => {
            if(userAcc === null) {
                return res.status(401).json({message:'Email Id does not exists. Please sign up to continue.', user: userAcc})
            } else if(userAcc !== null && userAcc.active == false) {
                return res.status(401).json({message:"Validate your account before sign in. Please check your email.", user: null})
            } 
            return next();
        }
    );
}


// test authentication
function ensureAuthenticated(req, res, next) {
	let token = req.body.token || req.query.token; // taking the token we passed in the request
	req.user = false; 
    if (!token) {
    	return res.status(403).json({});
	}
    jwt.verify(token, config.JWTsecret, function(err, user) {
        if (err) {
        	return next();
        }
        req.user = user;
        return next();
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
	var passw=  /^[A-Za-z]\w{7,14}$/;
	if(pass.value.match(passw))  { 
		return {success: true};
	}
	return {success: false}
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

function sendMail(email, msg, cb) {
   let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: config.nodemailerEmail, // generated ethereal user
	        pass: config.nodemailerPw // generated ethereal password
	    }
	});
	let msg = `Please validate your account ${config.server}/activate/${token}/${req.body.username}`
	// setup email data with unicode symbols
	let mailOptions = {
	    from: config.nodemailerEmail,
	    to: email,
	    subject: `Thanks for signing up to Lido. Please Verify your account `,
	    html: email(token, email)
	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	    	cb(error);
	        return console.log(error);
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
module.exports = {trimUser, userExists, validateEmail, validatePassword, ensureAuthenticated, ensureHasNoteAccess, getRandomString, passwordValidator, sendMail};
