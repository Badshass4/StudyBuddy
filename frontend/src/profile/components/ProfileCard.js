import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../utils/colorPalette';
import Axios from 'axios';

const ProfileCard = (props) => {

    const userData = props.userData;
    const courseData = props.courseData;
    const streamData = props.streamData;

    const [userDetails, setUserDetails] = React.useState({
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
        let courseId = value._id;
        let courseName = value.name;
        props.courseClick(courseId);
        setUserDetails({ ...userDetails, userCourse: courseName });
    };

    const handleStreamChange = (event, value) => {
        let streamName = value.title;
        console.log(streamName);
        setUserDetails({ ...userDetails, userStream: streamName});
    };

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
                        label="Phone No"
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
                        <Button variant="contained" color="primary" style={{ width: '100%' }}>
                            Edit Account
                    </Button>
                    </ThemeProvider>
                </div>
            </Grid>
        </div>
    )
}

export default ProfileCard
