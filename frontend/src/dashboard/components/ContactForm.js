import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../utils/colorPalette';
import '../styles/contactform.css';

const ContactForm = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    return (
        <div className="contact-form">
        <form className={innerWidth >= 500 ? 'contact_form-main' : 'contact_form-main-mobile'}>
            <div className="contact_form-fields">
                <TextField
                    id="fullName"
                    type="text"
                    // onKeyUp={handleUserDetailsChange}
                    label="Full Name"
                    required
                    fullWidth
                    variant="outlined"
                    autoComplete="off" />
            </div>
            <div className="contact_form-fields">
                <TextField
                    id="email"
                    type="email"
                    // onKeyUp={handleUserDetailsChange}
                    label="Email"
                    required
                    fullWidth
                    variant="outlined"
                    autoComplete="off" />
            </div>
            <div className="contact_form-fields">
                <TextField
                    id="userMail"
                    multiline
                    rows={4}
                    // onKeyUp={handleUserDetailsChange}
                    label="Message"
                    required
                    fullWidth
                    variant="outlined"
                    autoComplete="off" />
            </div>
            <div className="contact_form-button">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </ThemeProvider>
            </div>
        </form>
        </div>
    )
}

export default ContactForm
