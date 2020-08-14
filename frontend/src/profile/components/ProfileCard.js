import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../utils/colorPalette';

const ProfileCard = (props) => {

    return (
        <div className={"profile_card"} >
            < Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="firstName"
                        type="text"
                        className={"profile_card-field"}
                        label="First Name"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lastName"
                        type="text"
                        className={"profile_card-field"}
                        label="Last Name"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="email"
                        type="email"
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
                        className={"profile_card-field"}
                        label="User Name"
                        required
                        disabled
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="phoneNo"
                        type="text"
                        className={"profile_card-field"}
                        label="Phone No"
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="college"
                        type="text"
                        className={"profile_card-field"}
                        label="College Name"
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="course"
                        type="text"
                        className={"profile_card-field"}
                        label="Course Name"
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="stream"
                        type="text"
                        className={"profile_card-field"}
                        label="Stream Name"
                        variant="outlined" />
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
