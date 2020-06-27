import React, { useEffect, useState } from 'react'
import axios from "axios"
import FormElements from '../components/FormElements'
import '../styles/addnote.css'
// import AlertMessage from '../../utils/AlertMessage'


const AddNotePage = () => {

    let [allSubjects, setAllSubjects] = useState([]);

    useEffect(() => {
        //get subjects for dropdown
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

    const postFormHandler = (title, subject, file) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject', subject.label);
        formData.append('file', file);
        //submit add-note
        axios
            .post(
                "http://localhost:5000/admin/add-note",
                formData
            )
            .then(response => {
                alert('Form submitted successfully')
            }).catch(err => {
                alert(err)
            });
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
