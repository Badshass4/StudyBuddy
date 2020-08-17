import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import { setUserImagePath } from '../../redux/reducers/userReducer';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
}));

const ProfileImage = (props) => {
    const dispatch = useDispatch();
    let authToken = useSelector(state => {
        return state.userReducer.authToken;
    });
    const [state, setState] = useState({
        onlyMe: true,
    });

    const userData = props.userData;
    let [userDetails, setUserDetails] = useState({
        userFirstName: userData.userFirstName,
        userLastName: userData.userLastName,
        userImagePath: userData.userImagePath
    });

    const [modifiedImagePath, setModifiedImagePath] = useState("");

    useEffect(() => {
        let imagePath = userDetails.userImagePath;
        let backendApi = process.env.REACT_APP_BACKEND_API;
        imagePath = imagePath.replace("uploads\\", "/");
        imagePath = imagePath.replace("\\", "/");
        backendApi = backendApi.replace("api", "");
        imagePath = backendApi + imagePath;
        setModifiedImagePath(imagePath);
    }, [userDetails])

    useEffect(() => {
        setUserDetails({
            ...userDetails,
            userFirstName: userData.userFirstName,
            userLastName: userData.userLastName
        })
    }, [userData])

    const handleToggleSwitch = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const removeProfileIcon = (event) => {
        event.preventDefault();
        alert("hi");
    }

    const fileSelectionHandler = (event) => {
        let fileObj = event.target.files[0];
        let userName = userData.userName;
        const formData = new FormData();
        formData.append('file', fileObj);
        formData.append('userName', userName);

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_API}/user/profile-image`,
                formData,
                {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                }
            )
            .then(result => {
                setUserDetails({ ...userDetails, userImagePath: result.data.filePath });
                dispatch(setUserImagePath(result.data.filePath));
                let userData = JSON.parse(localStorage.getItem('userData'));
                userData.imagePath = result.data.filePath;
                localStorage.setItem('userData', JSON.stringify(userData));
            })
            .catch(err => {
                console.log(err);
            })
    };

    const classes = useStyles();
    return (
        <div className={"profile_image"}>
            <div className={"avatar"}>
                <Avatar alt={userDetails.userFirstName}
                    src={modifiedImagePath}
                    className={classes.large}
                // className={"avatar"}
                >
                    {userDetails.userFirstName.substring(0, 1) + userDetails.userLastName.substring(0, 1)}
                </Avatar>
                <div className={"profile_img-edit"}>
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item className={"edit_btn"}>
                            <input
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                type="file"
                                onChange={fileSelectionHandler}
                                required
                            />
                            <EditTwoToneIcon />
                        </Grid>
                        <Grid item></Grid>
                        <Grid item className={"delete_btn"}>
                            <HighlightOffTwoToneIcon />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <center><h2>{userDetails.userFirstName + " " + userDetails.userLastName}</h2></center>
            <Typography component="div" className={'profile_image-toggle'}>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Public</Grid>
                    <Grid item>
                        <Switch
                            checked={state.onlyMe}
                            onChange={handleToggleSwitch}
                            color="default"
                            name="onlyMe"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid item>Only Me</Grid>
                </Grid>
            </Typography>
        </div>
    )
}

export default ProfileImage
