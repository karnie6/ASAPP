var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

var Base = require('./components/Base.jsx');
var Signup = require('./components/Signup.jsx');

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Signup}>
    </Route>
  </Router>

);

module.exports = Routes;
