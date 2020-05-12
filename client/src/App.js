import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser}  from './actions/authActions';
import store from './store';
import PrivateRoute from '../src/components/common/PrivateRoute';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AddClass from './components/Course-Comp/addCourse';
import RegisterClass from './components/Course-Comp/RegisterClass';

import { clearCurrentUser } from './actions/classActions';

//check for login token
if(localStorage.jwtToken) {
	//set auth token 
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	//check for expired token
	const currentTime = Date.now()/ 1000;
	if(decoded.exp < currentTime){
		//logout user
		store.dispatch(logoutUser());
		//clear current profile
		store.dispatch(clearCurrentUser());

		window.location.href = '/login';
	}
}

class App extends Component {
  render() {
    return (
		<Provider store={ store }>
			<Router>
				<div className="App">
					<Navbar/>
						<Route exact path="/" component={ Landing } />
						<div className="container">
							<Route exact path="/register" component={Register} /> 
							<Route exact path="/login" component={Login} /> 
							<Switch>
							{/* //prevents redirection issue (should be b/w switch only*/}
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch> 
							<Switch>
							<PrivateRoute exact path="/addclass" component={AddClass} />
							</Switch>
							<Switch>
							<PrivateRoute exact path="/registerclass" component={RegisterClass} />
							</Switch>
						</div>
					<Footer/>
				</div>
		</Router>
	  </Provider>	
    );
  }
}

export default App;
