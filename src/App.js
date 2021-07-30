import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './component/Layout/Navbar';
import Home from './component/Pages/Home';
import AddUserDetails from './component/User/AddUserDetails';
import EditUserDetails from './component/User/EditUserDetails';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path="/users/addusers" component={AddUserDetails}></Route>
        <Route exact path="/users/editusers/:id" component={EditUserDetails}></Route>
      </Switch>
    </Router>
  );
}

export default App;
