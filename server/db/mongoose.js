let MongoClient = require('mongodb').MongoClient;
let mongoose = require('mongoose');
let config = require('../config/config')
var url = config.mongoUrl;

mongoose.connect(url, { useNewUrlParser: true }, console.log('connected to mongo'))
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

module.exports = {mongoose};