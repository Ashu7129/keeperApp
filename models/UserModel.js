const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");
const Note = require("./NoteModel")


const userSchema = mongoose.Schema({
    notes:[Note.NoteSchema],
    username:String,
    password:String,
    fname:String,
    lname:String
});

userSchema.plugin(passportlocalmongoose);

const userCollection = mongoose.model("user", userSchema);

module.exports = userCollection;