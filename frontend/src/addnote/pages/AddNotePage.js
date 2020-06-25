import React, { useEffect, useState } from 'react'
import axios from "axios"
import FormElements from '../components/FormElements'
import '../styles/addnote.css'


const AddNotePage = () => {

    let [allSubjects, setAllSubjects] = useState([]);

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
            <FormElements parameters={formElementParams}></FormElements>
        </form>
    )
}

export default AddNotePage
