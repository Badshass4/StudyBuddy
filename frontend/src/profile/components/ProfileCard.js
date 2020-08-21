import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../redux/reducers/snackBarReducer';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../utils/colorPalette';
import { isValidText, isValidEmail, isValidPhoneNo } from '../../utils/validate';


const ProfileCard = (props) => {
    const dispatch = useDispatch();

    const userData = props.userData;
    const courseData = props.courseData;
    const streamData = props.streamData;

    const [userDetails, setUserDetails] = useState({
        userFirstName: userData.userFirstName,
        userLastName: userData.userLastName,
        userMail: userData.userMail,
        userName: userData.userName,
        userPhoneNo: userData.userPhoneNo,
        userCollege: userData.userCollege,
        userCourse: userData.userCourse,
        userStream: userData.userStream
    });

    const handleUserDetailsChange = (event) => {
        setUserDetails({ ...userDetails, [event.target.id]: event.target.value })
    };

    const handleCourseChange = (event, value) => {
        if (value !== null) {
            let courseId = value._id;
            let courseName = value.name;
            props.courseClick(courseId);
            setUserDetails({ ...userDetails, userCourse: courseName });
        } else {
            props.courseClick("");
            setUserDetails({ ...userDetails, userCourse: "", userStream: "" });
        }

    };

    const handleStreamChange = (event, value) => {
        if (value !== null) {
            let streamName = value.title;
            setUserDetails({ ...userDetails, userStream: streamName });
        } else {
            setUserDetails({ ...userDetails, userStream: "" });
        }
    };

    const handleEditClick = () => {
        let editUserDetails = userDetails;
        editUserDetails.userFirstName = editUserDetails.userFirstName.trim();
        editUserDetails.userLastName = editUserDetails.userLastName.trim();
        editUserDetails.userMail = editUserDetails.userMail.trim();
        editUserDetails.userPhoneNo = editUserDetails.userPhoneNo.trim();
        editUserDetails.userCollege = editUserDetails.userCollege.trim();
        if (isValidText(editUserDetails.userFirstName)
            && isValidText(editUserDetails.userLastName)
            && isValidEmail(editUserDetails.userMail)) {
            if (isValidPhoneNo(editUserDetails.userPhoneNo)) {
                props.editprofile(editUserDetails);
            } else {
                dispatch(setSnackbar(
                    true,
                    "error",
                    "Please enter correct phone number"));
            }
        } else {
            dispatch(setSnackbar(
                true,
                "error",
                "Please fill all the required fields"));
        }
    }

    return (
        <div className={"profile_card"} >
            < Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="userFirstName"
                        type="text"
                        defaultValue={userDetails.userFirstName}
                        onKeyUp={handleUserDetailsChange}
                        className={"profile_card-field"}
                        label="First Name"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="userLastName"
                        type="text"
                        defaultValue={userDetails.userLastName}
                        onKeyUp={handleUserDetailsChange}
                        className={"profile_card-field"}
                        label="Last Name"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="userMail"
                        type="email"
                        onKeyUp={handleUserDetailsChange}
                        defaultValue={userDetails.userMail}
                        className={"profile_card-field"}
                        label="Email"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="userName"
                        type="text"
                        defaultValue={userDetails.userName}
                        className={"profile_card-field"}
                        label="User Name"
                        required
                        disabled
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="userPhoneNo"
                        type="text"
                        onKeyUp={handleUserDetailsChange}
                        defaultValue={userDetails.userPhoneNo}
                        className={"profile_card-field"}
                        label="Phone Number"
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="userCollege"
                        type="text"
                        onKeyUp={handleUserDetailsChange}
                        defaultValue={userDetails.userCollege}
                        className={"profile_card-field"}
                        label="College Name"
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        id="userCourse"
                        type="text"
                        key={(option) => option._id}
                        options={courseData}
                        getOptionLabel={(option) => option.name}
                        onChange={handleCourseChange}
                        defaultValue={{ name: userDetails.userCourse }}
                        renderInput={(params) =>
                            <TextField {...params} label="Courses" variant="outlined" />}
                        className={"profile_card-field"}
                        label="Course Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {streamData.length !== 0 &&
                        <Autocomplete
                            id="userStream"
                            type="text"
                            key={(option) => option._id}
                            options={streamData}
                            getOptionLabel={(option) => option.title}
                            onChange={handleStreamChange}
                            defaultValue={{ title: userDetails.userStream }}
                            renderInput={(params) =>
                                <TextField {...params} label="Streams" variant="outlined" />}
                            className={"profile_card-field"}
                            label="Stream Name"
                            variant="outlined"
                        />
                    }
                </Grid>
                <div className="profile_card-button">
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" onClick={handleEditClick} style={{ width: '100%' }}>
                            Update Profile
                    </Button>
                    </ThemeProvider>
                </div>
            </Grid>
        </div>
    )
}

export default ProfileCard
