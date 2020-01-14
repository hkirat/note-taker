let {User} = require('./UserSchema');
let jwt = require('jsonwebtoken');
let config = require('../../config/config');

function get(_id) {
	return User.User.findOne({_id}).exec();
}

function register(email, password, first_name, last_name) {
	return User.register(new User({
	        active: false,
	        username: email,
	        first_name: first_name,
	        last_name: last_name
	    }), password)
}

module.exports = {get, register};