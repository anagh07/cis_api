import './App.css';
import Header from './SharedComponent/Header';
import HomePage from './SharedComponent/HomePage';
import Footer from './SharedComponent/Footer';
import Login from './SharedComponent/Login';
import SelfAssessment from './SharedComponent/SelfAssessment';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={HomePage} path="/" />
        <Route exact component={Login} path="/login" />
        <Route exact component={SelfAssessment} path="/selfassessment" />
      </Switch>
    </Router>
  );
}

export default App;
