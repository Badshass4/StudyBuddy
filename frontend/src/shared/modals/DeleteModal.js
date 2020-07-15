import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { theme } from '../../utils/colorPalette';
import { ThemeProvider } from "@material-ui/core/styles";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = (props) => {
    const dispatch = useDispatch();

    const deleteNote = () => {
        axios.delete("http://localhost:5000/admin/deletenote",
            {
                params: {
                    noteId: props.noteInfo._id
                }
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
                <DialogContentText id="alert-dialog-slide-description">
                    Do you want to remove <b>{props.noteInfo.title}</b> ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ThemeProvider theme={theme}>
                    <Button onClick={props.closeModal} variant="contained" color="secondary">
                        NO
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                    <Button onClick={deleteNote} variant="contained" color="primary">
                        YES
                    </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteModal
