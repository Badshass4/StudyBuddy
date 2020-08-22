import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../utils/colorPalette';

const ContactForm = () => {
    return (
        <div >
            < Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="userFirstName"
                        type="text"
                        // onKeyUp={handleUserDetailsChange}
                        label="Name"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="userLastName"
                        type="text"
                        // onKeyUp={handleUserDetailsChange}
                        label="Email"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="userMail"
                        multiline
                        rows={4}
                        // onKeyUp={handleUserDetailsChange}
                        label="Message"
                        required
                        variant="outlined"
                        autoComplete="off" />
                </Grid>
                <div>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" style={{ width: '100%' }}>
                            Submit
                    </Button>
                    </ThemeProvider>
                </div>
            </Grid>
        </div>
    )
}

export default ContactForm
