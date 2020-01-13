let {User} = require('./UserSchema');
let jwt = require('jsonwebtoken');
let config = require('../../config/config');

function get(_id) {
	return User.User.findOne({_id}).exec();
}

function register(email, password, first_name, last_name) {
	return new Promise((resolve, reject) => {
		User.register(new User({
	        active: false,
	        email: email,
	        first_name: first_name,
	        last_name: last_name
	    }), password)
	    .exec();
	})
}

module.exports = {get};