import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { theme } from '../../utils/colorPalette';
import { ThemeProvider } from "@material-ui/core/styles";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";
import { isValidText, isValidFile, isValidSubject } from '../../utils/validate'
import { makeStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditModal = (props) => {
    const dispatch = useDispatch();

    let [allSubjects, setAllSubjects] = useState([]);
    let [title, setTitle] = useState(props.noteInfo.title);
    let [subject, setSubject] = useState({ label: props.noteInfo.subject });
    const prevTitle = props.noteInfo.title;
    const prevSubject = props.noteInfo.subject;


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

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_API}/admin/subjects`
            )
            .then(response => {
                setAllSubjects(response.data.allSubject);
            }).catch(err => {
                console.log(err);
            });
    }, [])

    // Taking inputs for title field
    const handleTitleInput = (event) => {
        setTitle(event.target.value);
    }

    // taking inputs for subject field using AutoComplete
    const handleDropdownChange = (event, value) => {
        setSubject(value);
    }

    const handleEditCancel = () => {
        props.closeModal();
        setTimeout(() => {
            setTitle(prevTitle);
            setSubject({ label: prevSubject });
        }, 500);
    }

    // This function will edit a studymaterial
    const editNote = () => {
        if (isValidText(title) && isValidSubject(subject)) {
            let subjectName = '';
            typeof subject === 'object' ? subjectName = subject.label : subjectName = subject;
            axios.put(`${process.env.REACT_APP_BACKEND_API}/admin/edit-note`,
                {
                    noteId: props.noteInfo._id,
                    title: title,
                    subject: subjectName
                })
                .then(response => {
                    dispatch(setSnackbar(
                        true,
                        "success",
                        response.data.message));
                    props.closeModal();
                    props.refresh();
                })
                .catch(err => {
                    dispatch(setSnackbar(
                        true,
                        "error",
                        err.response.data.message))
                    props.closeModal();
                })
        } else {
            dispatch(setSnackbar(
                true,
                "error",
                'Fill out all the fields'))
        }
    };

    return (
        <Dialog
            style={{ backgroundColor: 'transparent' }}
            open={props.openStatus}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.closeModal}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <TextField
                    label="Title"
                    defaultValue={prevTitle}
                    value={title}
                    onChange={handleTitleInput}
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                    error={!isValidText(title)}
                />
            </DialogContent>
            <DialogContent>
                <Autocomplete
                    id="subjectDropdown"
                    classes={!isValidSubject(subject) ? dropdownErrorClass : {}}
                    value={subject}
                    key={(option) => option.id}
                    options={allSubjects}
                    getOptionLabel={(option) => option.label}
                    style={{ width: '100%' }}
                    onChange={handleDropdownChange}
                    renderInput={(params) =>
                        <TextField {...params} label="Subjects" variant="outlined" required />}
                />
            </DialogContent>
            <DialogContent>
                <DialogActions>
                    <ThemeProvider theme={theme}>
                        <Button onClick={handleEditCancel} variant="contained" color="secondary">
                            CANCEL
                    </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button onClick={editNote} variant="contained" color="primary">
                            SUBMIT
                    </Button>
                    </ThemeProvider>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default EditModal
