let {Notes} = require('./NoteSchema');
let config = require('../../config/config');
let NOTE_LIMIT = config.GLOBALS.NOTE_LIMIT;

function getAll() {
	return Notes.find({}).limit(NOTE_LIMIT).exec();
}

function get(slug, user_id) {
	return Notes.findOne({slug, members: {"$in": [user_id]}});
}

function approve(slug, user_id, member_id) {
	return get(slug, member_id)
		.then((note) => {
			if(note) {
				let index = note.requests.map((req => req.user_id)).indexOf(user_id);
				let updatedRequests = note.requests;
				if(index != -1) {
					note.requests.splice(index, 1);
				}
				return Notes.updateOne({slug}, {"$set": {requests: updatedRequests},
				 	"$addToSet": {"members": user_id}
			 	});
			}
			return Promise.reject();
		})
}

function request(slug, user_id, email) {
	return Notes.updateOne({slug}, {"$addToSet": {"requests": {user_id, email}}});
}

function insert(title, description, admin, slug) {
	let time = new Date()/1000;
	return Notes.create({admin, members: [admin], description, title, slug, dateOfCreation: time, lastUpdated: time});
}

function update(title, description, user_id, slug) {
	return Notes.updateOne({slug, members: {"$in": [user_id]}}, {description, title, lastUpdated: new Date()/1000});
}

module.exports = {get, insert, request, approve, getAll, update};