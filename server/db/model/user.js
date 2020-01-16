let {User} = require('./UserSchema');
let jwt = require('jsonwebtoken');
let config = require('../../config/config');

function get(_id) {
	return User.findOne({_id}).exec();
}

function getFromEmail(email) {
	return User.findOne({username: email}).exec();
}

function register(email, password, first_name, last_name) {
	return User.register(new User({
	        active: false,
	        username: email,
	        first_name: first_name,
	        last_name: last_name
	    }), password)
}

function activate(username) {
	return User.findOneAndUpdate({username: username}, {"$set": {active:true}}).exec()
}

module.exports = {get, register, getFromEmail, activate};