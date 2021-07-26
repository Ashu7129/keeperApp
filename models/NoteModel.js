const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    title:String,
    content:String
});

const noteCollection = mongoose.model("note", noteSchema);

module.exports = noteCollection;