import './App.css';
import Header from './SharedComponent/Header';
import HomePage from './SharedComponent/HomePage';
import Footer from './SharedComponent/Footer';
import Login from './SharedComponent/Login';
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
      </Switch>
    </Router>
  );
}

export default App;
