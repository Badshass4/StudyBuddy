import React, {useState} from 'react';
import '../styles/dashboardPage.css';
import FeatureElements from '../components/FeatureElements';

const DashboardPage = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth); 
    return (
        <React.Fragment>
            <div className={ innerWidth>=500? "dashboard-main" : "dashboard-main__mobile"}>
                <h2>Hello In Dashboard</h2>
                <FeatureElements />
            </div>
            
        </React.Fragment>
    )
}


export default DashboardPage