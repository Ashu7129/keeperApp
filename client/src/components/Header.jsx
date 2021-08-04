import React, { useState } from "react";
import NoteIcon from "@material-ui/icons/Note";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TransitionsModal from "./Modal";
import { GetUser } from "./database";
import axios from "axios";




function Header(props) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formType, setFormType] = useState("");

  const username = GetUser();

  function Dropdown(props) {
    return <div className="dropdown-list">
      <ul>
        <li onClick={() => {
          setFormType("Login");
          OpenModal();
        }
        }>Login as</li>
        {username!=="" && <li onClick={() => {
          axios({
            method: "post",
            url: "/api/notes/logout",
          }).then(()=>window.location.reload());
        }}>Logout</li>
        }
        
        <li onClick={() => { OpenModal(); setFormType("Register"); }}>Create new Account</li>
      </ul>
    </div>
  }

  function OpenModal() {
    setOpenModal(true);
  }

  function CloseModal() {
    setOpenModal(false);
  }

  return (
    <header className="navbar">
      <h1 className="logo">
        <NoteIcon /> Keeper
      </h1>
      <div className="account" >
        <h5><span style={{ position: "absolute", right: "70px", bottom: "22px"}}>{username}</span> <AccountCircleIcon style={{ fontSize: "2.5rem" }} onClick={() => { setOpen(!open) }} /></h5>
      </div>
      {open && <Dropdown />}
      {openModal && <TransitionsModal CloseModal={CloseModal} formType={formType} />}
    </header>

  );
}

export default Header;
