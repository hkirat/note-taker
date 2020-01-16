let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var NotesSchema = mongoose.Schema({
    title: {type: String},
    dateOfCreation: {type: Date},
    lastUpdated: {type: Date},
    description: {type: Object},
    admin: {type: ObjectId},
    members: {type: [String]},
    slug: {type: String},
    requests: {type: Array}
});

  
let Notes = mongoose.model("Notes", NotesSchema);
module.exports = {Notes};
