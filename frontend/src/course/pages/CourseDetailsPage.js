import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StreamGrid from '../components/StreamGrid';
import YearGrid from '../components/YearGrid';
import '../styles/coursedetailspage.css';

const CourseDetailsPage = (props) => {
    let [streams, setStreams] = useState([]);
    let [year, setYear] = useState([]);

    let courseId = useSelector(state => {
        return state.routeParamsReducer.courseId;
    });

    // This function will call whenever courseId will be change, else nothing will happen
    // Fetching all the streams of a particular course and there duration
    // If there is no stream available, redirecting to year page of that course
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/user/stream/` + courseId)
            .then(response => {
                setYear([response.data.result.duration]);
                if (response.data.result.stream.length !== 0) {
                    setStreams(response.data.result.stream);
                } else {
                    setStreams([]);
                    props.history.push("/user/course/stream/years");
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
