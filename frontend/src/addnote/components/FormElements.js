import React, { useState } from 'react'
import '../styles/formelements.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { isValidText, isValidFile, isValidSubject } from '../../utils/validate'
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";
import { theme } from '../../utils/colorPalette';

const FormElements = (props) => {

    let [title, setTitle] = useState("");
    let [subject, setSubject] = useState({});
    let [file, setFile] = useState({});
    let [validTitle, setValidTitle] = useState(true);
    let [validSubject, setValidSubject] = useState(true);
    let [validFile, setValidFile] = useState(true);
    let [fileErrorMsg, setFileErrorMsg] = useState("");

    const dispatch = useDispatch();

    const handlePostForm = props.submitForm;

    const useStyles = makeStyles(theme => ({
        inputRoot: {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "red"
            }
            // "&:hover .MuiOutlinedInput-notchedOutline": {
            //     borderColor: "red"
            // },
            // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            //     borderColor: "purple"
            // }
        }
    }));

    const dropdownErrorClass = useStyles();

    const optionsParams = props.parameters[1]

    // Taking inputs for title field
    const handleTitleInput = (event) => {
        setTitle(event.target.value);
        setValidTitle(true);
    }

    // taking inputs for subject field using AutoComplete
    const handleDropdownChange = (event, value) => {
        setSubject(value);
    }

    // taking inputs for the file
    const fileSelectionHandler = (event) => {
        var fileObj = event.target.files[0];
        setFile(fileObj);
    }

    // Submitting the add-note page with user input values
    // Firstly, it will validate all the user inputs, if true then call the post method
    const handleFormSubmit = () => {
        setValidTitle(isValidText(title));
        setValidSubject(isValidSubject(subject));
        setValidFile(isValidFile(file).isValid);
        setFileErrorMsg(isValidFile(file).errorMessage);
        if (isValidText(title) && isValidSubject(subject) && isValidFile(file).isValid) {
            handlePostForm(title, subject, file);
        }
        else {
            dispatch(setSnackbar(
                true,
                "error",
                "Please fill all the fields"))
        }
    };

    const textElement = <React.Fragment>
        <TextField
            label="Title"
            onKeyUp={handleTitleInput}
            required
            variant="outlined"
            style={{ width: '100%' }}
            error={!validTitle}
        />
        <FormHelperText id="outlined-weight-helper-text">
            <span style={!validTitle ? { paddingLeft: '10px', color: 'red' } : { display: 'none' }}>Please fill out this field</span>
        </FormHelperText>
    </React.Fragment>


    const dropdownElement = (el) => {
        return <React.Fragment>
            <Autocomplete
                id="subjectDropdown"
                classes={!validSubject ? dropdownErrorClass :{}}
                key={(option) => option.id}
                options={optionsParams.options}
                getOptionLabel={(option) => option.label}
                style={{ width: '100%' }}
                onChange={handleDropdownChange}
                renderInput={(params) =>
                    <TextField {...params} label="Subjects" variant="outlined" required />}
            />
            <FormHelperText id="outlined-weight-helper-text">
                <span style={!validSubject ? { paddingLeft: '10px', color: 'red' } : { display: 'none' }}>Please select a subject</span>
            </FormHelperText>
        </React.Fragment>
    }

    const uploadElement =
        <React.Fragment>
            <input
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={fileSelectionHandler}
                required
            />
            <label htmlFor="contained-button-file">
                <FormControl style={{ width: '100%' }}
                >
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        placeholder="Upload file *"
                        value={file.name}
                        required
                        autoComplete="off"
                        endAdornment={<InputAdornment className="upload-button-style" position="end"><CloudUploadIcon /></InputAdornment>}
                        inputprops={{
                            readOnly: true
                        }}
                        labelWidth={0}
                        error={!validFile}
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                        <span style={!validFile ? { paddingLeft: '10px', color: 'red' } : { display: 'none' }}>{fileErrorMsg}</span>
                    </FormHelperText>
                </FormControl>
            </label>
        </React.Fragment >

    const finalElement = props.parameters.map(el => {
        if (el.type === 'text') {
            return <CardContent key={el.label}>{textElement}</CardContent>
        } else if (el.type === 'select') {
            return <CardContent key={el.label}>{dropdownElement(el)}</CardContent>
        } else if (el.type === 'upload') {
            return <CardContent key={el.label}>{uploadElement}</CardContent>
        }
    })

    return (
        <div style={{ paddingTop: '20px' }}>
            <Card className="card-style">
                <CardContent>
                    {finalElement}
                </CardContent>
                <CardActions style={{ paddingLeft: '200px' }}>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleFormSubmit} variant="contained" color="primary">
                            Submit
                    </Button>
                    </ThemeProvider>
                </CardActions>
            </Card>
        </div>
    )
}

export default FormElements
