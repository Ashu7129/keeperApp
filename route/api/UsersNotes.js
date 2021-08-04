const express = require("express");
const router = express.Router();
const passport = require("../../passport");
router.use(express.urlencoded({ extended: true }));


//Notemodel
const User = require("../../models/UserModel");
const Note = require("../../models/NoteModel").NoteModel;

//handling routes api


//show samplenotes
router.get("/getNotes", (req, res) => {
    //if user authenticated
    if(req.isAuthenticated()){
        User.findOne({_id:req.user._id}, function(err, found){
            if(!err){
                res.send(found);
            }
        })
    }
});

router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;

    const newUser = new User({
        username: username,
        password: password,
        fname: fname,
        lname: lname
    });

    newUser.save((err, saveduser) => {
        if (err) { console.log(err) }
        else {
            console.log(saveduser);
            passport.authenticate('local', { failureRedirect: "/" })(req, res, function () {
                res.redirect("/getNotes");
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
    passport.authenticate('local'),
    (req, res) => {
        console.log('loggedin', req.user);
        /* the  above line is only for debugging and will print the below in Terminal
        logged in { _id: 5b7a79a545de52523ea1a482,
        username: 'rohanpaul2@gmail.com',
        password: '$2a$10$9eC8kXcVduG3885FLT1AweYIYsfvwLUIFJ65lvIvUZQZhcWpL6H0q',
 }
*/
        res.redirect("/getNotes");
    }
)
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
                    console.log("routes/adNote : Updated Notes "+ result);
                });
                
            }
        })
    }

});
router.post("/delete", (req, res) => {

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

