import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from '../components/ProfileImage';
import ProfileCard from '../components/ProfileCard';
import { setSnackbar } from '../../redux/reducers/snackBarReducer';
import {
    setUserFirstName,
    setUserLastName,
    setUserMail,
    setUserPhoneNo,
    setUserCollege,
    setUserCourse,
    setUserStream
} from '../../redux/reducers/userReducer';
import "../styles/profile.css";

const Profile = (props) => {

    const dispatch = useDispatch();
    let authToken = useSelector(state => {
        return state.userReducer.authToken;
    });

    const [innerWidth,
        setInnerWidth] = useState(window.innerWidth);
    const [courses,
        setCourses] = useState([]);
    const [streams,
        setStreams] = useState([]);
    // const [editCardData,
    //     setEditCardData] = useState({});
    const userData = useSelector(state => {
        return state.userReducer;
    });

    useEffect(() => {
        // setEditCardData(userData);
        axios
            .get(`${process.env.REACT_APP_BACKEND_API}/user/courses`)
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
        axios
            .get(`${process.env.REACT_APP_BACKEND_API}/user/stream/` + courseId)
            .then(response => {
                setStreams(response.data.result.stream);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
    };

    const handleProfileEdit = (userDetails) => {
        axios
            .put(`${process.env.REACT_APP_BACKEND_API}/user/edit-profile/`, userDetails, {
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            })
            .then(response => {
                // vai erom kore sb kota dispatch mar
                dispatch(setUserFirstName(userDetails.userFirstName));
                dispatch(setUserLastName(userDetails.userLastName));
                dispatch(setUserMail(userDetails.userMail));
                dispatch(setUserPhoneNo(userDetails.userPhoneNo));
                dispatch(setUserCollege(userDetails.userCollege));
                dispatch(setUserCourse(userDetails.userCourse));
                dispatch(setUserStream(userDetails.userStream));
                // haa age dispatch the localstorage e...ohh ok r same values ager din er moto
                // localstorage eo push kor
                let localUserData = JSON.parse(localStorage.getItem('userData'));
                localUserData.firstName = userDetails.userFirstName;
                localUserData.lastName = userDetails.userLastName;
                localUserData.email = userDetails.userMail;
                localUserData.phoneNo = userDetails.userPhoneNo;
                localUserData.college = userDetails.userCollege;
                localUserData.course = userDetails.userCourse;
                localUserData.stream = userDetails.userStream;
                localStorage.setItem('userData', JSON.stringify(localUserData));
                dispatch(setSnackbar(true, "success", response.data.message));
                // setEditCardData()
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div
            className={innerWidth >= 500
                ? "form_main"
                : "form_main-mobile"}>
            <ProfileImage userData={userData} />
            <ProfileCard
                userData={userData}
                courseData={courses}
                streamData={streams}
                courseClick={handleCourseClick}
                editprofile={handleProfileEdit} />
        </div>
    );
}

export default Profile
