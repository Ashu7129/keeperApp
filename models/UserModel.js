const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const passportlocalmongoose = require("passport-local-mongoose");
const Note = require("./NoteModel")


const userSchema = mongoose.Schema({
    notes:[Note.NoteSchema],
    username:String,
    password:String,
    fname:String,
    lname:String
});

userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}


/* The hashPassword method does just what it says, it hashes the password. The first argument is the password to hash, and the second parameter is the salt length to generate (integer). */

// Defining hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/UserModel.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/UserModel.js hashPassword in pre save');
		this.password = this.hashPassword(this.password)
		next()
	}
})

const userCollection = mongoose.model("user", userSchema);

module.exports = userCollection;