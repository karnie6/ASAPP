var React = require('react');
var DisplayNameComponent = require('./DisplayNameComponent.jsx');
var Rooms = require('./Rooms.jsx');
var socket = io.connect('/roomlist');


var Signup = React.createClass({
  getInitialState: function() {
    return {showDisplayName: true, showRooms: false, rooms: []}
  },
  componentDidMount: function() {
    socket.on('connect', this.initialize);
    socket.on('roomupdate', this.updateRooms);
  },
  initialize: function(data) {
    console.log("Websocket connected!");
  },
  updateRooms: function(data) {
    var roomData = JSON.parse(data);
    this.setState({rooms:roomData});
  },
  onSubmit: function() {
    this.setState({showDisplayName: false, showRooms: true});
  },
  render: function() {
    return (<div>
      {this.state.showDisplayName ? <div><DisplayNameComponent ref="displayName" /><button className="btn btn-primary" onClick={this.onSubmit}>Find A Room</button></div> : null }
      {this.state.showRooms ? <Rooms rooms={this.state.rooms} displayName={this.refs.displayName.state.value}/> : null }
      </div>
      );
  }
});

module.exports = Signup;
