import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './DisplayComponent/HomePage';
import LoginPage from './DisplayComponent/LoginPage';
import SignUpPage from './DisplayComponent/SignUpPage';
import ManagerDashboardPage from './DisplayComponent/ManagerDashboardPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={HomePage} path="/" />
        <Route exact component={LoginPage} path="/login" />
        <Route exact component={SignUpPage} path="/signup" />
        <Route exact component={ManagerDashboardPage} path="/manager_dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
