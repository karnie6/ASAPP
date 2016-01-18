var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

var Base = require('./components/Base.jsx');
var Chatroom = require('./components/Chatroom.jsx');

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Base}>
    </Route>
  </Router>

);

module.exports = Routes;
