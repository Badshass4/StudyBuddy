import React, { useState } from 'react';

import ProfileImage from '../components/ProfileImage';
import ProfileCard from '../components/ProfileCard';
import "../styles/profile.css";


const Profile = (props) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    return (
        <div className={innerWidth >= 500 ? "form_main" : "form_main-mobile"}>

            <ProfileImage />
            <ProfileCard />
        </div>
    );
}

export default Profile
