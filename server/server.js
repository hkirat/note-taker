let express = require("express");
let bodyParser = require("body-parser");
let cors = require('cors')
let RateLimit = require('express-rate-limit')
let logger = require("morgan");

let config  = require('./config/config')
let user = require('./routes/user')
/*
let resetPasswordHandler = require('./routes/resetPasswordHandler')
let resetPasswordEmail = require('./routes/resetPasswordEmail')
let protected = require('./routes/protected')
*/
// passport imports
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let session = require('express-session')

// mongo imports
let mongodb = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let {mongoose} = require('./db/mongoose');

let limiter = new RateLimit({
	windowMs: 15*60*1000, // 15 minute rate limit
	max: 4000,
	delayMs: 0
  });

let app = express();

app.use(logger(config.env));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(limiter)
app.listen(3001, () => console.log(`Example app listening on port 3001!`))

app.use('/user', user)