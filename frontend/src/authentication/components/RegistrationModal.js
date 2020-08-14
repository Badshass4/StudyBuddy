import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { theme } from '../../utils/colorPalette';
import { ThemeProvider } from "@material-ui/core/styles";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";
import { isValidText, isValidEmail, isValidPassword, isValidConfirmPassword } from '../../utils/validate';
import { makeStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const RegistrationModal = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [showPassword, setShowPassword] = useState(false);


    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegistrationCancel = () => {
        props.closeModal();
    };

    const handleRegisterClick = () => {
        let trimmedFirstName = firstName.trim();
        let trimmedLastName = lastName.trim();
        let trimmedEmail = email.trim();
        let trimmedPassword = password.trim();
        let trimmedConfirmPassword = confirmPassword.trim();

        let validFirstName = isValidText(trimmedFirstName);
        let validLastName = isValidText(trimmedLastName);
        let validEmail = isValidEmail(trimmedEmail);
        let validPassword = isValidPassword(trimmedPassword);
        let validConfirmPassword = isValidConfirmPassword(trimmedPassword, trimmedConfirmPassword);

        if (trimmedFirstName === '' ||
            trimmedLastName === '' ||
            trimmedEmail === '' ||
            trimmedPassword === '' ||
            trimmedConfirmPassword === '') {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Please enter all the fields !"
                )
            );
        } else if (!validFirstName) {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Please enter a valid first name !"
                )
            );
        } else if (!validLastName) {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Please enter a valid last name !"
                )
            );
        } else if (!validEmail) {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Please enter a valid email !"
                )
            );
        } else if (!validPassword) {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Password should have min of 8 characters - an uppercase, a lowercase, a digit !"
                )
            );
        } else if (!validConfirmPassword) {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Confirm password didn't match with password  !"
                )
            );
        } else {
            dispatch(
                setSnackbar(
                    true,
                    "success",
                    "Registerd cheers !"
                )
            );
            // axios.post(
            //     `${process.env.REACT_APP_BACKEND_API}/authentication/registration`,
            //     {
            //         firstName: trimmedFirstName,
            //         lastName: trimmedLastName,
            //         email: trimmedEmail,
            //         password: trimmedPassword
            //     }

            // )
            //     .then(response => {
            //         dispatch(
            //             setSnackbar(
            //                 true,
            //                 "success",
            //                 response.data.message
            //             )
            //         );
            //     }).catch(err => {
            //         dispatch(
            //             setSnackbar(
            //                 true,
            //                 "error",
            //                 err.response.data.message
            //             )
            //         );
            //     });
            // props.closeModal();
        }
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
            <DialogTitle id="alert-dialog-title" style={{ minWidth: '30vw' }}>{"Sign up your free account"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="First Name"
                    onKeyUp={handleFirstName}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                // error={!isValidText(title)}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    label="Last Name"
                    onKeyUp={handleLastName}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                // error={!isValidText(title)}
                />
            </DialogContent>
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
                <FormControl className={clsx(classes.textField)} style={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={handlePassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </DialogContent>
            <DialogContent>
                <TextField
                    label="Confirm password"
                    type="password"
                    onKeyUp={handleConfirmPassword}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                // error={!isValidText(title)}
                />
            </DialogContent>
            <DialogContent>
                <DialogActions>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleRegistrationCancel} variant="contained" color="secondary">
                            CANCEL
                    </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleRegisterClick} variant="contained" color="primary">
                            REGISTER
                    </Button>
                    </ThemeProvider>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default RegistrationModal
