import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SubjectGrid from '../components/SubjectGrid';
import '../styles/coursedetailspage.css';

const SubjectDetailsPage = (props) => {
    const [subjects, setSubjects] = useState([]);
    let path = props.history.location.pathname;
    let year = path.split("/")[4].replace('year', '');
    let streamId = path.split("/")[3];
    let courseId = path.split("/")[2];

    useEffect(() => {
        axios.get('http://localhost:5000/user/subject',
            {
                params: {
                    course: courseId,
                    stream: streamId,
                    year: year
                }
            })
            .then(response => {
                setSubjects(response.data.result);
            })
            .catch(err => {
                setSubjects([]);
            })
    }, []);

    return (
        <React.Fragment>
            <div className="main-container">
                <SubjectGrid subjectInfo={subjects} />
            </div>
        </React.Fragment>
    )
}

export default SubjectDetailsPage
