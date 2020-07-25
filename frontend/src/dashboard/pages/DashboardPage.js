import React from 'react';
import '../styles/dashboardPage.css';
import FeatureElements from '../components/FeatureElements';

const DashboardPage = () => {
    return (
        <React.Fragment>
            <div className="dashboard-main">
                <h2>Hello In Dashboard</h2>
                <FeatureElements />
            </div>
            
        </React.Fragment>
    )
}


export default DashboardPage