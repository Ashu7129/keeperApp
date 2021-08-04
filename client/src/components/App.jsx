import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Notes from "./NotesApi"


function App() {

  return (
    <div>
      <Header />
      <CreateArea />
      <Notes />
      <Footer />
    </div>
  );
}

export default App;
