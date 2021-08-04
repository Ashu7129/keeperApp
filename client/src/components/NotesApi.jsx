import React, { useState } from "react";
import Note from "./Note";
import axios from "axios";

function NotesApi(props){
    const [notes, setNotes]= useState([]);

  function getNotes(){
    axios.get("/api/notes/getNotes").then((response)=>{
      setNotes(response.data.notes);
    });
    props.setMountNotes(false);
  }

  if(props.mountNotes===true){
    getNotes();
  }
  function deleteNote(id) {
    axios({
      method:"post",
      url:"/api/notes/delete",
      data:{
        noteId:id
      }
    });
    props.setMountNotes(true);
}

return (
    notes.map((noteItem)=>{
        return  <Note
        key={noteItem._id}
        id={noteItem._id}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={deleteNote}
      />
    })
);

}

export default NotesApi;