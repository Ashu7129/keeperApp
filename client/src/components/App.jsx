import React ,{useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Notes from "./NotesApi"


function App() {
  const [mountNotes, setMountNotes] = useState(true);

  return (
    <div>
      <Header/>
      <CreateArea mountNotes={mountNotes} setMountNotes={setMountNotes} />
      <Notes mountNotes={mountNotes} setMountNotes={setMountNotes} />
      <Footer />
    </div>
  );
}

export default App;
