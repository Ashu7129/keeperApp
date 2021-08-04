import React, { useState } from "react";
import NoteIcon from "@material-ui/icons/Note";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TransitionsModal from "./Modal";



function Header(props) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formType, setFormType] = useState("");

  function Dropdown(props) {
    return <div className="dropdown-list">
      <ul>
        <li onClick={() => {
          setFormType("Login");
          OpenModal();
        }
        }>Login</li>
        <li>Logout</li>
        <li onClick={() => { OpenModal(); setFormType("Register"); }}>Create new Account</li>
      </ul>
    </div>
  }

  function OpenModal() {
    setOpenModal(true);
  }

  function CloseModal(){
    setOpenModal(false);
  }

  return (
    <header className="navbar">
      <h1 className="logo">
        <NoteIcon /> Keeper
      </h1>
      <div className="account" >
        <h5><AccountCircleIcon style={{ fontSize: "2.5rem" }} onClick={() => { setOpen(!open) }} /></h5>
      </div>
      {open && <Dropdown />}
      {openModal && <TransitionsModal CloseModal={CloseModal} formType={formType}/>}
    </header>

  );
}

export default Header;
