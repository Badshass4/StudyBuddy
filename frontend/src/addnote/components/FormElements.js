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


const FormElements = (props) => {

    let [fileName, setFileName] = useState("");

    const textElement = <TextField label="Title" required variant="outlined" style={{ width: '100%' }} />

    const optionsParams = props.parameters[1]

    const fileSelectionHandler = (event) => {
        fileName = event.target.files[0].name;
        setFileName(fileName);
    }

    const dropdownElement = (el) => {
        return <Autocomplete
            id="subjectDropdown"
            key={(option) => option.id}
            options={optionsParams.options}
            getOptionLabel={(option) => option.label}
            style={{ width: '100%' }}
            renderInput={(params) =>
                <TextField {...params} label="Subjects" variant="outlined" required/>}
        />
    }

    const uploadElement =
        <React.Fragment>
            <input
                accept="image/*"  // only accepts image files now
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={fileSelectionHandler}
                required
            />
            <label htmlFor="contained-button-file">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    placeholder="Upload file *"
                    value={fileName}
                    required
                    autoComplete="off"
                    style={{ width: '100%' }}
                    endAdornment={<InputAdornment className="upload-button-style" position="end"><CloudUploadIcon /></InputAdornment>}
                    inputprops={{
                        readOnly: true
                    }}
                    labelWidth={0}
                />
            </label>
        </React.Fragment>

    const finalElement = props.parameters.map(el => {
        if (el.type === 'text') {
            return <CardContent>{textElement}</CardContent>
        } else if (el.type === 'select') {
            return <CardContent>{dropdownElement(el)}</CardContent>
        } else if (el.type === 'upload') {
            return <CardContent>{uploadElement}</CardContent>
        }
    })

    const handleFormSubmit = () =>{
        alert('Form Submitted');
    };

    return (
        <div style={{paddingTop: '20px'}}>
            <Card className="card-style">
                <CardContent>
                    {finalElement}
                </CardContent>
                <CardActions style={{ paddingLeft: '200px' }}>
                    <Button onClick={handleFormSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default FormElements
