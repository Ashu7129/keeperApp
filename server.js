require('dotenv').config();
const express= require('express');
const mongoose = require("mongoose");
const NoteApirouter = require("./route/api/Notes");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.resolve(__dirname, "./client/build")));

mongoose
.connect("mongodb+srv://ashutosh-admin:ashutosh123@cluster0.oj4d9.mongodb.net/KeeperDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
.then(() => console.log("MOngoDB connected..."))
.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

app.use("/api/notes", NoteApirouter );

app.get("/", (req, res)=>{
    res.send("Connected!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
  