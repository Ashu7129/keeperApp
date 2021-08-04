const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    title:String,
    content:String
});

const NoteModel = new mongoose.model("note", noteSchema);
module.exports.NoteModel = NoteModel;
module.exports.NoteSchema= noteSchema;