import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom'
import Test from './dashboard/pages/Test.js'
import NewTest from './dashboard/components/NewTest.js'


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
  return <Router>
    <Switch>
      <Route path="/" exact>
        <Test></Test>
      </Route>
      <Route path="/new" exact>
        <NewTest></NewTest>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  </Router>;
}

export default App;
