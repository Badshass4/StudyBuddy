import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SubjectGrid from '../components/SubjectGrid';
import '../styles/coursedetailspage.css';

const SubjectDetailsPage = (props) => {
    const [subjects, setSubjects] = useState([]);
    let year = useSelector(state => {
        return state.routeParamsReducer.year;
    });
    let streamId = useSelector(state => {
        return state.routeParamsReducer.streamId;
    });
    let courseId = useSelector(state => {
        return state.routeParamsReducer.courseId;
    });

    // Fetching all subject of a particular combination of course, stream and year
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
