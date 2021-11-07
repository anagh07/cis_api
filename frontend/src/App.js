import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './SharedComponent/Header';
import Footer from './SharedComponent/Footer';
import SelfAssessment from './SharedComponent/SelfAssessment';
import HomePage from './DisplayComponent/HomePage';
import LoginPage from './DisplayComponent/LoginPage';
import SignUpPage from './DisplayComponent/SignUpPage';
import ManagerDashboardPage from './DisplayComponent/ManagerDashboardPage';
import AddDoctorPage from './DisplayComponent/AddDoctorPage';
import AddNursePage from './DisplayComponent/AddNursePage';
import AddPatientPage from './DisplayComponent/AddPatientPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={HomePage} path="/" />
        <Route exact component={LoginPage} path="/login" />
        <Route exact component={SignUpPage} path="/signup" />
        <Route exact component={ManagerDashboardPage} path="/manager_dashboard" />
        <Route exact component={SelfAssessment} path="/selfassessment" />
        <Route exact component={AddDoctorPage} path="/add_doctor" />
        <Route exact component={AddNursePage} path="/add_nurse" />
        <Route exact component={AddPatientPage} path="/add_patient" />
      </Switch>
    </Router>
  );
}

export default App;
