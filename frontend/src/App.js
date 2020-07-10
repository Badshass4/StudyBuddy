import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AddNotePage from './addnote/pages/AddNotePage';
import Header from './shared/navigation/Header';
import Snackbar from './shared/snackBar/snackBar';
import StudyMaterialPage from './studymaterials/pages/StudyMaterialPage';
import DashboardPage from './dashboard/pages/DashboardPage';


//  <------Note------>

// <Router> - If we want to acheive SPA(Single Page Applications),
//          then we need to enclose App within <Router>  

// <Route> - We need the enclose the desired component within this tag
//           to redirect the pages to the desired component on entering the URL

// <Redirect> - This tag is used to redirect to a default page if any wrong URL is entered

// <Switch> - If the <Redirect> is present, it will always redirect any other URL to the default one.
//            To avoid this we need to enclose the Routes within <Switch>.
//            This tag tells the dom to redirect all the other URLs to default except the mentioned routes.

function App() {
  return <BrowserRouter>
    <Route component={Header}>
    </Route>
    <Snackbar />
    <Switch>
      <Route path="/dashboard" exact component={DashboardPage}>
      </Route>
      <Route path="/admin/addnote" exact component={AddNotePage}>
      </Route>
      <Route path="/user/studymaterials/:subjectName" exact component={StudyMaterialPage}>
      </Route>
      <Redirect to="/dashboard"></Redirect>
    </Switch>
  </BrowserRouter>;
}

export default App;
