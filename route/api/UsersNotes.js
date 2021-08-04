const express = require("express");
const router = express.Router();
const passport = require("../../passport");
router.use(express.urlencoded({ extended: true }));

const User = require("../../models/UserModel");
const Note = require("../../models/NoteModel").NoteModel;

router.get("/getNotes", (req, res) => {
    //if user authenticated
    if(req.isAuthenticated()){
        User.findOne({_id:req.user._id}, function(err, found){
            if(!err){
                res.send(found);
            }
        })
    }else{
        res.send({
            notes:[
                {
                    title:"This is sample title",
                    content:"This is sample body content"
                }
            ]
        });
    }
});

router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;

    User.register({ username: req.body.username, fname:fname, lname:lname }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.send("Unsuccessful registration! Please try another email address");
        } else {
            passport.authenticate('local', { failureRedirect: "/register" })(req, res, function () {
                console.log("router post register: authenticated after register")
                res.send("registered succesfully");
            });
        }
    })
});


router.post('/login',
    (req, res, next) => {
        console.log('routes/user.js, login, the value of req.body is: ') // line only for debugging for me
        console.log(req.body)
        /* the above is only for debugging and will print in the terminal -  { username: 'rohanpaul2@gmail.com', password: '123456' }  */
        next()
    },
    passport.authenticate('local', { failureRedirect:"/api/notes/loginfailed" }),
    (req, res) => {
        console.log('loggedin', req.user.username);
        res.send("Welcome Back "+ req.user.fname + " " + req.user.lname);
    }
)

router.get("/loginfailed", (req, res)=> {
    res.send("Invalid Email/Password");
})

router.post("/addNote", (req, res) => {
    const newNote = new Note({
        title:req.body.title,
        content:req.body.content
    });
    if(req.isAuthenticated()){
        User.findOne({_id:req.user._id}, function(err, found){
            if(!err){
                found.notes.push(newNote);
                found.save((err, result)=>{
                    console.log("routes/adNote : Updated Notes "+ result.notes);
                });
                
            }
        })
    }else{
        res.send("Please Login first!");
    }
});
router.post("/delete", (req, res) => {
    if(req.isAuthenticated()){
        User.findOneAndUpdate({_id:req.user._id},{$pull: {notes: {_id:req.body.noteId}}}, function(err, result){
            if(err){
                console.log(errr);
            }else{
                console.log("Deleted a Note");
            }
        })
    }else{
        res.send("Please Login first!")
    }

});
router.post("/logout", (req, res)=>{
    req.logout();
    res.send("");
});



module.exports = router;




























// router.get("/", (req, res) => {
//     NoteModel.find({}, (err, result) => {
//         if (!err) {
//             res.send(result);
//         }
//     });
// });

// router.get("/post", (req, res) => {
//     var newNote = new NoteModel({
//         title: req.query.title,
//         content: req.query.content
//     });
//     newNote.save();
// });

// router.get("/delete", (req, res)=>{
//     var noteId = req.query.noteId;
//     NoteModel.deleteOne({_id:noteId}, (err, result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Note deleted")
//         }
//     })
// })

// module.exports = router;

