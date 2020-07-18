import React, { useEffect, useState } from 'react';
import axios from "axios";
import FormElements from '../components/FormElements';
import '../styles/addnote.css';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackBarReducer";


const AddNotePage = (props) => {
    let [allSubjects, setAllSubjects] = useState([]);

    const dispatch = useDispatch();

    // This function will only call while mounting for the first time
    // Get all the available subjects into the auto-complete field in add-note page
    useEffect(() => {
        axios
            .get(
                "http://localhost:5000/admin/subjects"
            )
            .then(response => {
                document.title = "StudyBuddy | Add Notes";
                allSubjects = response.data;
                setAllSubjects(allSubjects.allSubject);
            }).catch(err => {
                console.log(err);
            });
    }, []);

    // Call the REST API to upload study-material
    const postFormHandler = (title, subject, file, mode = 'addnote') => {
        if (mode === 'addnote') {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('subject', subject.label);
            formData.append('file', file);

            axios
                .post(
                    "http://localhost:5000/admin/add-note",
                    formData
                )
                .then(response => {
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            response.data.message
                        )
                    );
                }).catch(err => {
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            err.response.data.message
                        )
                    );
                });
        } else {
            //mode=editnote
            axios
                .put(
                    "http://localhost:5000/admin/edit-note",
                    {
                        params: {
                            title: title,
                            subject: subject.label
                        }
                    }
                )
                .then(response => {
                    dispatch(
                        setSnackbar(
                            true,
                            "success",
                            response.data.message
                        )
                    );
                }).catch(err => {
                    dispatch(
                        setSnackbar(
                            true,
                            "error",
                            err.response.data.message
                        )
                    );
                });
        }
    }


    const formElementParams = [
        {
            type: "text",
            label: "Title"
        },
        {
            type: "select",
            label: "Subjects",
            options: allSubjects
        },
        {
            type: "upload",
            label: "Upload File"

        }];

    return (
        <form className="form-control" method="POST">
            <FormElements parameters={formElementParams} submitForm={postFormHandler}></FormElements>
        </form>
    )
}

export default AddNotePage
