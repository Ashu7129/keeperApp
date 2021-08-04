const User = require('../models/UserModel');
const LocalStrategy = require('passport-local').Strategy

// https://github.com/jaredhanson/passport-local#usage

// With the new keyword we tell Passport to use an instance of the LocalStrategy we required.
const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user);
		})
	}
)

module.exports = strategy;