import React, { useEffect, useState } from 'react'
import axios from 'axios';
import YearGrid from '../components/YearGrid';
import '../styles/coursedetailspage.css';

const StreamDetailsPage = (props) => {
    let [streamId, setStreamId] = useState('');
    let [year, setYear] = useState([]);
    let path = props.history.location.pathname;
    streamId = path.split("/")[3];
    let courseId = path.split("/")[2];

    useEffect(() => {
        axios.get('http://localhost:5000/user/stream/' + courseId)
            .then(response => {
                setYear(response.data.result.duration);
            })
            .catch(err => {
                setYear([]);
            })
    }, [streamId])
    return (
        <React.Fragment>
            <div className="main-container">
                <YearGrid yearInfo={year} courseId={courseId} />
            </div>
        </React.Fragment>
    )
}

export default StreamDetailsPage
