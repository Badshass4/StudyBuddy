import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import ProfileImage from '../components/ProfileImage';
import ProfileCard from '../components/ProfileCard';
import "../styles/profile.css";

const Profile = (props) => {

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [courses, setCourses] = useState([]);
    const [streams, setStreams] = useState([]);
    const userData = useSelector(state => {
        return state.userReducer;
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/user/courses`)
            .then(response => {
                let allCourses = response.data.result
                setCourses(allCourses);
                if (userData.userCourse) {
                    let userCourseObj = allCourses.find(c => {
                        return c.name === userData.userCourse
                    })
                    handleCourseClick(userCourseObj._id);
                }
            })
            .catch(err => {
                console.log(err.response.data.message);
            });


    }, []);

    const handleCourseClick = (courseId) => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/user/stream/` + courseId)
            .then(response => {
                setStreams(response.data.result.stream);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
    };

    return (
        <div className={innerWidth >= 500 ? "form_main" : "form_main-mobile"}>
            <ProfileImage userData={userData} />
            <ProfileCard
                userData={userData}
                courseData={courses}
                streamData={streams}
                courseClick={handleCourseClick}
            />
        </div>
    );
}

export default Profile
