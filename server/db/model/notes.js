let {Notes} = require('./NoteSchema');
let config = require('../../config/config');
let NOTE_LIMIT = config.GLOBALS.NOTE_LIMIT;

function getAll() {
	return Notes.find({}).limit(NOTE_LIMIT).exec();
}

function get(slug, user_id) {
	return Notes.findOne({slug, user: {"$in": members}});
}

function add(slug, user_id, member_id) {
	return get(slug, member_id)
		.then((note) => {
			if(note.)
			return Notes.updateOne({slug}, {"$push": {"members": user_id}});
		})
}

function request(slug, user_id) {
	Notes.updateOne({slug}, {"$push": {"requests": user_id}});
}

function insert(title, description, admin) {
	return Notes.create({admin, members: [admin], description, title}).exec();
}

module.exports = {get, insert, request, add, getAll};