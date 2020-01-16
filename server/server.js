let express = require("express");
let bodyParser = require("body-parser");
let cors = require('cors')
let RateLimit = require('express-rate-limit')
let logger = require("morgan");

let config  = require('./config/config')
let user = require('./routes/user')
let notes = require('./routes/notes')

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let session = require('express-session')
let {User} = require('./db/model/UserSchema');

// mongo imports
let mongodb = require('mongodb');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))

app.use('/user', user)
app.use('/notes', notes)
