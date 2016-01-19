var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

//don't really need Base now, but adding here in case we need it later
var Base = require('./components/Base.jsx');
var ASAPPChatApp = require('./components/ASAPPChatApp.jsx');

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={ASAPPChatApp}/>
  </Router>

);

module.exports = Routes;
