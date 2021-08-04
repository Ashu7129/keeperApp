import React from "react";
import Note from "./Note";
import {GetNotes, DeleteNote} from "./database";

function NotesApi(){
const notes = GetNotes();

return (
    notes.map((noteItem)=>{
        return  <Note
        key={noteItem._id}
        id={noteItem._id}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={DeleteNote}
      />
    })
);

}

export default NotesApi;