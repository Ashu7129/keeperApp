require('dotenv').config();
const express= require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const NoteApirouter = require("./route/api/UsersNotes");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;

mongoose
.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
.then(() => console.log("MOngoDB connected..."))
.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

const app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'thisissomesecret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/notes", NoteApirouter);

app.get("/", (req, res)=>{
    res.send("Connected!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
  