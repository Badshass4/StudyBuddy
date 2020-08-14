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
        position: 'fixed',
        right: '5vw',
        bottom: '10vh'
    },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
}));


const FeatureElements = () => {

    const classes = useStyles();

    // This actions are shown in speed-dial feature of dashboard
    let [actions, setActions] = useState([]);
    let [isLoggedIn, setIsLoggedIn] = useState(store.getState().authReducer.isLoggedIn);

    const [open, setOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

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
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="SpeedDial example"
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
    );
}

export default FeatureElements;