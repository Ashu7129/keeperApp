import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {
  const [notes, setNotes]= useState([]);
  function getNotes(){
    axios.get("/api/notes").then((response)=>{
      setNotes(response.data);
    });
  }
  
 getNotes();

  function addNote(newNote) {
    axios.request({
      url:"/api/notes/post",
      method:"get",
      params:{
        title: newNote.title,
        content:newNote.content
      }
    });
  }

  function deleteNote(id) {
    axios.request({
      url:"/api/notes/delete",
      method:"get",
      params:{
        noteId:id
      }
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
