import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import store from '../../redux/store';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoginModal from '../../authentication/components/LoginModal';
import RegistrationModal from '../../authentication/components/RegistrationModal';

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    //   exampleWrapper: {
    //     position: 'fixed',
    //     height: '70vh',
    //     width: '92vw'
    //   },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'fixed',
        top: '100%',
        right: '17%',
        // '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        //   bottom: theme.spacing(2),
        //   right: theme.spacing(2),
        // },
        // '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        //   top: theme.spacing(2),
        //   left: theme.spacing(2),
        // },
    },
}));


const FeatureElements = () => {

    // This actions are shown in speed-dial feature of dashboard
    let [actions, setActions] = useState([]);
    let [isLoggedIn, setIsLoggedIn] = useState(store.getState().authReducer.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            setActions([
                { icon: <ShareIcon />, name: 'Share' },
                { icon: <FavoriteIcon />, name: 'Like' }
            ])
        } else {
            setActions([
                { icon: <PersonRoundedIcon />, name: 'Login' },
                { icon: <PersonAddRoundedIcon />, name: 'Registration' },
                { icon: <ShareIcon />, name: 'Share' },
                { icon: <FavoriteIcon />, name: 'Like' }
            ])
        }
    }, [isLoggedIn])

    const handleAfterLogin = () => {
        setIsLoggedIn(store.getState().authReducer.isLoggedIn);
    };

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleIconClick = (actionType) => {
        handleClose();
        if (actionType === 'Login') {
            handleLoginClick();
        } else if (actionType === 'Registration') {
            handleRegistrationClick();
        }
    };

    const handleLoginClick = () => {
        setLoginModalOpen(true);
    };

    const handleLoginClose = () => {
        setLoginModalOpen(false);
    };

    const handleRegistrationClick = () => {
        setRegistrationModalOpen(true);
    };

    const handleRegistrationClose = () => {
        setRegistrationModalOpen(false);
    };

    return (
        <div styles={{ position: 'fixed' }}>
            <div className={classes.root}>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => handleIconClick(action.name)}
                        />
                    ))}
                </SpeedDial>
                <LoginModal openStatus={loginModalOpen} closeModal={handleLoginClose} afterLogin={handleAfterLogin} />
                <RegistrationModal openStatus={registrationModalOpen} closeModal={handleRegistrationClose} />
            </div>
        </div>
    );
}

export default FeatureElements;