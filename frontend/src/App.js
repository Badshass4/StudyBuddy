import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Header from './shared/navigation/Header';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setLogIn } from './redux/reducers/authReducer';
import {
  setIsAdmin, setUserFirstName, setUserLastName,
  setUserMail, setUserName, setUserPhoneNo,
  setUserCollege, setUserCourse, setUserStream,
  setAuthToken, setUserImagePath
} from './redux/reducers/userReducer';
// import AddNotePage from './addnote/pages/AddNotePage';
// import Snackbar from './shared/snackBar/snackBar';
// import StudyMaterialPage from './studymaterials/pages/StudyMaterialPage';
// import DashboardPage from './dashboard/pages/DashboardPage';
// import CourseDetailsPage from './course/pages/CourseDetailsPage';
// import StreamDetailsPage from './course/pages/StreamDetailsPage';
// import SubjectDetailsPage from './course/pages/SubjectDetailsPage';


// Modified imports to not load all pages at a time - Code Splitting

// const Header = React.lazy(() => import('./shared/navigation/Header'));
const AddNotePage = React.lazy(() => import('./addnote/pages/AddNotePage'));
const Snackbar = React.lazy(() => import('./shared/snackBar/snackBar'));
const StudyMaterialPage = React.lazy(() => import('./studymaterials/pages/StudyMaterialPage'));
const DashboardPage = React.lazy(() => import('./dashboard/pages/DashboardPage'));
const CourseDetailsPage = React.lazy(() => import('./course/pages/CourseDetailsPage'));
const StreamDetailsPage = React.lazy(() => import('./course/pages/StreamDetailsPage'));
const SubjectDetailsPage = React.lazy(() => import('./course/pages/SubjectDetailsPage'));
const Profile = React.lazy(() => import('./profile/pages/Profile'));

//  <------Note------>

// <Router> - If we want to acheive an SPA(Single Page Applications),
//          then we need to enclose App within <Router>  

// <Route> - We need to enclose the desired component within this tag
//           to redirect the pages to the desired component on entering the URL

// <Redirect> - This tag is used to redirect to a default page if any wrong URL is entered

// <Switch> - If the <Redirect> is present, it will always redirect any other URL to the default one.
//            To avoid this we need to enclose the Routes within <Switch>.
//            This tag tells the dom to redirect all the other URLs to default except the mentioned routes.

const App = () => {
  const dispatch = useDispatch();
  let isLoggedIn = useSelector(state => {
    return state.authReducer.isLoggedIn;
  });

  useEffect(() => {
    const loggedInUserData = JSON.parse(localStorage.getItem('userData'));
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();
    if (loggedInUserData && currentTime < expirationTime) {
      isLoggedIn = true;
      dispatch(setLogIn(true));
      dispatch(setIsAdmin(loggedInUserData.isAdmin));
      dispatch(setUserFirstName(loggedInUserData.firstName));
      dispatch(setUserLastName(loggedInUserData.lastName));
      dispatch(setUserMail(loggedInUserData.email));
      dispatch(setUserName(loggedInUserData.userName));
      dispatch(setUserPhoneNo(loggedInUserData.phoneNo));
      dispatch(setUserCollege(loggedInUserData.college));
      dispatch(setUserCourse(loggedInUserData.course));
      dispatch(setUserStream(loggedInUserData.stream));
      dispatch(setUserImagePath(loggedInUserData.imagePath));
      dispatch(setAuthToken(loggedInUserData.token));
      
    } else {
      localStorage.removeItem('userData');
      localStorage.removeItem('expirationTime');
    }
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        {/* Dashboard page */}
        <Route path="/dashboard" exact component={DashboardPage} />

        {/* Add new note page */}
        <Route path="/admin/addnote" exact component={AddNotePage} />

        {/* Note view according to subjects page */}
        <Route path="/user/studymaterials/:subjectName" exact component={StudyMaterialPage} />

        {/* Streams view page  */}
        <Route path="/user/course/streams" exact component={CourseDetailsPage} />

        {/* Year view page */}
        <Route path="/user/course/stream/years" exact component={StreamDetailsPage} />

        {/* Subject view page */}
        <Route path="/user/course/stream/year/subjects" exact component={SubjectDetailsPage} />

        {/* My profile view page */}
        <Route path="/user/profile" exact component={Profile} />

        {/* Redirect to default Dashboard page while setting incorrect path */}
        <Redirect to="/dashboard" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        {/* Dashboard page */}
        <Route path="/dashboard" exact component={DashboardPage} />

        {/* Note view according to subjects page */}
        <Route path="/user/studymaterials/:subjectName" exact component={StudyMaterialPage} />

        {/* Streams view page  */}
        <Route path="/user/course/streams" exact component={CourseDetailsPage} />

        {/* Year view page */}
        <Route path="/user/course/stream/years" exact component={StreamDetailsPage} />

        {/* Subject view page */}
        <Route path="/user/course/stream/year/subjects" exact component={SubjectDetailsPage} />

        {/* Redirect to default Dashboard page while setting incorrect path */}
        <Redirect to="/dashboard" />
      </Switch>
    );
  }
  return <BrowserRouter>
    <Route component={Header} />
    <Suspense
      fallback={<div style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Backdrop className="backdrop">
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>}>
      <Snackbar />
      {routes}
    </Suspense>
  </BrowserRouter>;
}
export default App;
