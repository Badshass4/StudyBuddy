import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { theme } from '../../utils/colorPalette';
import { ThemeProvider } from "@material-ui/core/styles";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";
import { setLogIn } from '../../redux/reducers/authReducer';
import {
    setIsAdmin, setUserFirstName, setUserLastName,
    setUserMail, setUserName, setUserPhoneNo,
    setUserCollege, setUserCourse, setUserStream,
    setAuthToken, setUserImagePath
} from '../../redux/reducers/userReducer';
import Link from '@material-ui/core/Link';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = (props) => {
    const dispatch = useDispatch();
    // const classes = useStyles();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginCancel = () => {
        props.closeModal();
    };

    const handleLoginClick = () => {
        let trimmedEmail = email.trim();
        let trimmedPassword = password.trim();

        axios.get(
            `${process.env.REACT_APP_BACKEND_API}/authentication/login`,
            {
                params: {
                    email: trimmedEmail,
                    password: trimmedPassword
                }
            }
        )
            .then(response => {
                console.log(response.data.result);
                const {
                    isAdmin,
                    firstName,
                    lastName,
                    email,
                    userName,
                    college,
                    course,
                    stream,
                    phoneNo,
                    imagePath,
                    token
                } = response.data.result;
                localStorage.setItem('userData', JSON.stringify(response.data.result));
                localStorage.setItem('expirationTime', new Date().getTime() + 1000 * 60 * 60);
                dispatch(setLogIn(true));
                dispatch(setIsAdmin(isAdmin));
                dispatch(setUserFirstName(firstName));
                dispatch(setUserLastName(lastName));
                dispatch(setUserMail(email));
                dispatch(setUserName(userName));
                dispatch(setUserPhoneNo(phoneNo));
                dispatch(setUserCollege(college));
                dispatch(setUserCourse(course));
                dispatch(setUserStream(stream));
                dispatch(setUserImagePath(imagePath));
                dispatch(setAuthToken(token));
                props.afterLogin();
                props.closeModal();
                // props.history.push('/admin/addnote');
                dispatch(
                    setSnackbar(
                        true,
                        "success",
                        "Welcome " + firstName + " !"
                    )
                );
            }).catch(err => {
                dispatch(
                    setSnackbar(
                        true,
                        "error",
                        err.response.data.message
                    )
                );
            });
    }

    return (
        <Dialog
            style={{ backgroundColor: 'transparent' }}
            open={props.openStatus}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.closeModal}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-title" style={{ minWidth: '30vw' }}>{"Sign in to your account"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="email"
                    onKeyUp={handleEmail}
                    placeholder={email}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                // error={!isValidEmail(email)}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    label="Password"
                    type="password"
                    onKeyUp={handlePassword}
                    placeholder={password}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                // error={!isValidPassword(password)}
                />
            </DialogContent>
            <DialogContent>
                <DialogActions>
                    <Typography>
                        <Link href="#">
                            Forgot Password?
                        </Link>
                    </Typography>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleLoginCancel} variant="contained" color="secondary">
                            CANCEL
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleLoginClick} variant="contained" color="primary">
                            LOGIN
                        </Button>
                    </ThemeProvider>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default withRouter(LoginModal)
