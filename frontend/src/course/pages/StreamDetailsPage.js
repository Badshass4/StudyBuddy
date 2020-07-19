import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import YearGrid from '../components/YearGrid';
import '../styles/coursedetailspage.css';

const StreamDetailsPage = (props) => {
    let [year, setYear] = useState([]);
    let streamId = useSelector(state => {
        return state.routeParamsReducer.streamId;
    });

    let courseId = useSelector(state => {
        return state.routeParamsReducer.courseId;
    });

    // This function will call whenever streamId will be change, else nothing will happen
    // Fetching duration of a single stream using courseId
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/user/stream/` + courseId)
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
