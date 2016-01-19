var React = require('react');
var Chatroom = require('./Chatroom.jsx');
var socket = io.connect('/roomlist');
var messagesocket = io.connect('/messages');


var ASAPPChatApp = React.createClass({
  getInitialState: function() {
    return {user: '', showDisplayName: true, showRooms: false, rooms: []};
  },
  componentDidMount: function() {
    socket.on('connect', this.initialize);
    socket.on('roomupdate', this.updateRooms);
    messagesocket.on('connect', this.initialize);
    messagesocket.on('messagefeed', this.updateMessages);
  },
  initialize: function(data) {
    console.log("Websocket connected!");
  },
  updateRooms: function(data) {
    var roomData = JSON.parse(data);
    this.setState({rooms:roomData});
    roomData.map(function(room) {
      messagesocket.emit('joinroom', {'roomNumber':room.id, 'user':this.state.user});
    }, this);
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.setState({showDisplayName: false, showRooms: true});
  },
  onDisplayNameChange: function(e) {
    this.setState({user: e.target.value});
  },
  render: function() {
    var renderRoom = function(room) {
      return <Chatroom name={room.name} user={this.state.user} id={room.id}/>
    };

    return (<div>
      {this.state.showDisplayName ?
      <div><h3>Step #1: Choose a Display Name</h3><input className="form-control" placeholder="Enter your display name"
      onChange={this.onDisplayNameChange} value={this.state.user} />
      <button className="btn btn-primary" onClick={this.onSubmit}>Find A Room</button></div> : null }
      {this.state.showRooms ?
        <div class="cr-roomlist">
        <h3 class="userName">Step #2: Hello {this.state.user}, please choose the chatroom you'd like to enter:</h3>
        <ul class="roomlist">{this.state.rooms.map(renderRoom, this)}</ul></div>
        : null }
      </div>
      );
  }
});

module.exports = ASAPPChatApp;
