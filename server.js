require('dotenv').config();
const express= require('express');
const mongoose = require("mongoose");
const NoteApirouter = require("./route/api/Notes");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}));

mongoose
.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
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