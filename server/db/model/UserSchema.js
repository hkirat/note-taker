let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var UserSchema = mongoose.Schema({
    username: {type: String, index: true, required: true},
    active: {type: Boolean}, // the user activate his account
    dateOfRegistration: {type: Date},
    first_name: {type: String},
    last_name: {type: String}
});

UserSchema.plugin(uniqueValidator)
UserSchema.plugin(passportLocalMongoose, {
    findByUsername: function(model, queryParameters) {
      return model.findOne(queryParameters);
    }
  });
  
let User = mongoose.model("User", UserSchema);
module.exports = {User};
