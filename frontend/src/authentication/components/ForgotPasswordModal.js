import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { theme } from '../../utils/colorPalette';
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";
import { isValidOtp, isValidEmail, isValidPassword, isValidConfirmPassword } from '../../utils/validate';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '25ch',
    },
}));

const ForgotPasswordModal = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    let [step, setStep] = useState(1);
    let [email, setEmail] = useState('');
    let [otp, setOtp] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [showPassword, setShowPassword] = useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleOtp = (event) => {
        if (event.target.value.length <= 6) {
            setOtp(event.target.value);
        }
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

    const handleCancel = () => {
        props.closeModal();
        clear();
    };

    const clear = () => {
        setTimeout(() => {
            setStep(1);
            setEmail('');
            setOtp('');
            setPassword('');
            setConfirmPassword('');
            setShowPassword(false);
        }, 500);
    };

    const sendOtp = () => {
        let trimmedEmail = email.trim();
        let validEmail = isValidEmail(trimmedEmail);

        if (validEmail) {
            axios.post(
                `${process.env.REACT_APP_BACKEND_API}/authentication/verify-email`,
                {
                    email: trimmedEmail
                }
            ).then(response => {
                setStep(prevStep => prevStep + 1);
                dispatch(
                    setSnackbar(
                        true,
                        "success",
                        response.data.message
                    )
                );
            })
                .catch(err => {
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            err.response.data.message
                        )
                    );
                })
        } else {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Please enter a valid email !"
                )
            );
        }
    };

    const verifyOtp = () => {
        let trimmedEmail = email.trim();
        let trimmedOtp = otp.trim();
        let validOtp = isValidOtp(trimmedOtp);

        if (validOtp) {
            axios.get(
                `${process.env.REACT_APP_BACKEND_API}/authentication/verify-otp`,
                {
                    params: {
                        email: trimmedEmail,
                        otp: trimmedOtp
                    }
                }
            )
                .then(response => {
                    setStep(prevStep => prevStep + 1);
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            response.data.message
                        )
                    );
                })
                .catch(err => {
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            err.response.data.message
                        )
                    );
                })
        } else {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Please enter a valid OTP !"
                )
            );
        }
    };

    const changePassword = () => {
        let trimmedEmail = email.trim();
        let trimmedPassword = password.trim();
        let trimmedConfirmPassword = confirmPassword.trim();

        let validEmail = isValidEmail(trimmedEmail);
        let validPassword = isValidPassword(trimmedPassword);
        let validConfirmPassword = isValidConfirmPassword(trimmedPassword, trimmedConfirmPassword);

        if (trimmedEmail === '' ||
            trimmedPassword === '' ||
            trimmedConfirmPassword === '') {
            dispatch(
                setSnackbar(
                    true,
                    "error",
                    "Please enter all the fields !"
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
            axios.post(
                `${process.env.REACT_APP_BACKEND_API}/authentication/registration`,
                {
                    type: 'resetPassword',
                    email: trimmedEmail,
                    password: trimmedPassword
                })
                .then(response => {
                    props.closeModal();
                    clear();
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            response.data.message
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
    };

    const handleSubmitClick = () => {
        switch (step) {
            case 1:
                sendOtp();
                break;
            case 2:
                verifyOtp();
                break;
            case 3:
                changePassword();
                break;
            default:
                break;
        }
    };

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

            <DialogTitle id="alert-dialog-title" style={{ minWidth: '30vw' }}>
                {
                    step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'Update Password'
                }
            </DialogTitle>
            {
                step === 1 &&
                <DialogContent>
                    <TextField
                        label="Email"
                        onChange={handleEmail}
                        value={email}
                        placeholder="Enter your registered email"
                        required
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                </DialogContent>
            }
            {
                step === 2 &&
                <DialogContent>
                    <TextField
                        label="OTP"
                        onChange={handleOtp}
                        value={otp}
                        placeholder="Enter OTP"
                        required
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                </DialogContent>
            }
            {
                step === 3 &&
                <React.Fragment>
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
                            label="Confirm Password"
                            type="password"
                            onChange={handleConfirmPassword}
                            value={confirmPassword}
                            required
                            variant="outlined"
                            style={{ width: '100%' }}
                        />
                    </DialogContent>
                </React.Fragment>
            }
            <DialogContent>
                <DialogActions>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleCancel} variant="contained" color="secondary">
                            CANCEL
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleSubmitClick} variant="contained" color="primary">
                            {
                                step === 1 ? 'Send OTP' : step === 2 ? 'Verify' : 'Update'
                            }
                        </Button>
                    </ThemeProvider>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default ForgotPasswordModal
