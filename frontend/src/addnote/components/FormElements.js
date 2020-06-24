import React from 'react'
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
    const textElement = <TextField label="Title" required variant="outlined" style={{ width: '100%' }} />


    const optionsParams = props.parameters[1]

    const dropdownElement = (el) => {
        return <Autocomplete
            id="combo-box-demo"
            options={optionsParams.options}
            getOptionLabel={(option) => option.label}
            style={{ width: '100%' }}
            renderInput={(params) =>
                <TextField {...params} label="Subjects" variant="outlined" />}
        />
    }

    const clickUpload = () => {
        alert('HII')
    }

    const uploadElement =
        <React.Fragment>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    placeholder="Upload file"
                    disabled
                    style={{ width: '100%' }}
                    endAdornment={<InputAdornment className="upload-button-style"  position="end"><CloudUploadIcon /></InputAdornment>}
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

    return (
        <div>
            <Card className="card-style">
                <CardContent>
                    {finalElement}
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default FormElements
