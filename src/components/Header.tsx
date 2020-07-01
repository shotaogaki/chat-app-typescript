import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme, createMuiTheme } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'; 
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/auth';

const theme: Theme = createMuiTheme({
    spacing: 2,
});
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        color: "#388e3c",
        backgroundColor: "#81c784",
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(2),
    }, 
  })
);


const Header = () => {
    const classes = useStyles();
    const [state, setState] = useState({ isLogin: false, username: '', profilePicUrl: '' });

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => { if(user) {
                setState({ isLogin: true, username: user.displayName!, profilePicUrl: user.photoURL! });
            }else {
                setState({ isLogin: false, username: '', profilePicUrl: '' });
            } 
        });
    })

    const googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider(); 
        firebase.auth().signInWithRedirect(provider);
    }

    const googleSignOut = () => { 
        firebase.auth().signOut();
    }

    const renderLoginComponent = (classes: Record<"flex" | "button" | "root", string>) => {
        return (
            <Button color="inherit" className={classes.button} onClick={googleLogin}>
                Login with Google
            </Button>
        ); 
    }

    const renderLoginedComponent = (classes: Record<"flex" | "button" | "root", string>) => {
        return (
            <div>
                <Button color="inherit" className={classes.button}>
                    <Avatar alt="profile image" src={`${state.profilePicUrl}`} />
                    {state.username}
                </Button>
                <Button color="inherit" className={classes.button} onClick={googleSignOut}>
                    Sign Out
                </Button>
            </div>
        ); 
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="subtitle1" color="inherit" className={classes.flex}>
                        Chat App
                    </Typography>
                    {state.isLogin? renderLoginedComponent(classes) : renderLoginComponent(classes)}
                </Toolbar>
            </AppBar>
        </div>  
    );
}

export default Header;