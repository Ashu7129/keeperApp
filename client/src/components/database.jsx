import { useState } from "react";
import axios from "axios";


export function GetNotes() {
  const [notes, setNotes] = useState([]);
  axios.get("/api/notes/getNotes").then((response) => {
    setNotes(response.data.notes);
  });
  return notes;
}

export function GetUser() {
  const [user, setUser] = useState("");
  axios.get("/api/notes/getNotes").then((response) => {
    setUser(response.data.fname);
  });
  return user;
}


export function AddNote(newNote) {
  axios({
    method: "post",
    url: "/api/notes/addNote",
    data: {
      title: newNote.title,
      content: newNote.content
    }
  }).then((response) => {
    window.alert(response.data);
  });
}

export function DeleteNote(Id) {
  axios({
    method: "post",
    url: "/api/notes/delete",
    data: {
      noteId: Id
    }
  }).then((response)=> {window.alert(response.data)});
}
