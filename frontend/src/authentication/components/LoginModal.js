import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { theme } from '../../utils/colorPalette';
import { ThemeProvider, formatMs } from "@material-ui/core/styles";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";
import { isValidText } from '../../utils/validate';
import { setLogIn } from '../../redux/reducers/authReducer';

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
        email = email.trim();
        password = password.trim();

        axios.get(
            `${process.env.REACT_APP_BACKEND_API}/authentication/login`,
            {
                params: {
                    email: email,
                    password: password
                }
            }
        )
            .then(response => {
                console.log(response.data.result);
                dispatch(setLogIn(true));
                props.afterLogin();
                // props.history.push('/admin/addnote');
                // dispatch(
                //     setSnackbar(
                //         true,
                //         "success",
                //         response.data.message
                //     )
                // );
            }).catch(err => {
                dispatch(
                    setSnackbar(
                        true,
                        "error",
                        err.response.data.message
                    )
                );
            });
        props.closeModal();
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
            <DialogTitle id="alert-dialog-title" style={{ width: '30vw' }}>{"Sign in to your account"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="email"
                    onKeyUp={handleEmail}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                // error={!isValidText(title)}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    label="Password"
                    type="password"
                    onKeyUp={handlePassword}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                // error={!isValidText(title)}
                />
            </DialogContent>
            <DialogActions>
                <ThemeProvider theme={theme}>
                    <Button onClick={handleLoginCancel} variant="contained" color="secondary">
                        CANCEL
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                    <Button onClick={handleLoginClick} variant="contained" color="primary">
                        SIGN IN
                    </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>
    )
}

export default withRouter(LoginModal)
