const express = require("express");
const router = express.Router();

//Notemodel
const NoteModel = require("../../models/NoteModel");


//handling routes api

router.get("/", (req, res) => {
    NoteModel.find({}, (err, result) => {
        if (!err) {
            res.send(result);
        }
    });
});

router.get("/post", (req, res) => {
    var newNote = new NoteModel({
        title: req.query.title,
        content: req.query.content
    });
    newNote.save();
});

router.get("/delete", (req, res)=>{
    var noteId = req.query.noteId;
    NoteModel.deleteOne({_id:noteId}, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Note deleted")
        }
    })
})

module.exports = router;

