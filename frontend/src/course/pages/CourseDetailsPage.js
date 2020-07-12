import React, { useState, useEffect } from 'react'
import axios from 'axios';
import StreamGrid from '../components/StreamGrid';
import YearGrid from '../components/YearGrid';
import '../styles/coursedetailspage.css';

const CourseDetailsPage = (props) => {
    let [courseId, setCourseId] = useState('');
    let [streams, setStreams] = useState([]);
    let [year, setYear] = useState([]);
    let path = props.history.location.pathname;
    courseId = path.split("/")[2];


    useEffect(() => {
        axios.get('http://localhost:5000/user/stream/' + courseId)
            .then(response => {
                setYear([response.data.result.duration]);
                if (response.data.result.stream.length !== 0) {
                    setStreams(response.data.result.stream);
                } else {
                    setStreams([]);
                }
            })
            .catch(err => {
                setStreams([]);
            })
        setStreams(streams);
        return () => {
            setStreams([]);
            setYear([]);
        }
    }, [courseId])


    return (
        <React.Fragment>
            <div className="main-container">
                {streams.length > 0 ? <StreamGrid streamInfo={streams} /> : <YearGrid yearInfo={year} courseId={courseId} />}
            </div>
        </React.Fragment>

    )
}

export default CourseDetailsPage
