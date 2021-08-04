import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        borderRadius: "10px",

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

const Form = (props) => {
    const classes = useStyles();
    // create state variables for each input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {

        ///if Login
        if (props.formtype === "Login") {
            axios({
                method:"post",
                url: "/api/notes/login",
                data: {
                    username: email,
                    password: password
                }
            });

        }

        ///if Register
        if (props.formtype === "Register") {
            axios({
                method:"post",
                url: "/api/notes/register",
                data: {
                    fname: firstName,
                    lname: lastName,
                    username: email,
                    password: password
                }
            });

        }
        e.preventDefault();
        console.log(firstName, lastName, email, password);
        props.handleClose();
    };

    if (props.formtype === "Login") {
        return (
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div>
                    <Button variant="contained" onClick={() => props.handleClose()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" style={{ backgroundColor: "rgb(255, 145, 0)" }}>
                        Login
                    </Button>
                </div>
            </form>
        );
    } else {
        return (
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    variant="filled"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="filled"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div>
                    <Button variant="contained" onClick={() => props.handleClose()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" style={{ backgroundColor: "rgb(255, 145, 0)" }}>
                        Signup
                    </Button>
                </div>
            </form>
        );
    }
};

export default Form;