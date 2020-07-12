import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/dashboardPage.css';

const DashboardPage = (props) => {
    let courseId = useSelector(state => {
        return state.routeParamsReducer.courseId;
    });
    console.log(courseId);
    return (
        <React.Fragment>
            <div className="dashboard-main">
                <h2>Hello In Dashboard</h2>
            </div>
            <div>
                <h2>Here goes the info</h2>
            </div>
        </React.Fragment>
    )
}


export default DashboardPage