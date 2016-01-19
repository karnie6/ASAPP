var React = require('react');
var Chatroom = require('./Chatroom.jsx');
var socket = io.connect('/roomlist');
var messagesocket = io.connect('/messages');


var ASAPPChatApp = React.createClass({
  getInitialState: function() {
    return {user: '', showDisplayName: true, showRooms: false, rooms: [], chatRoomSelected: false};
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
  hideChatRooms: function() {
    this.setState({chatRoomSelected: true});
  },
  showChatRooms: function() {
    this.setState({chatRoomSelected: false});
  },
  render: function() {
    var renderRoom = function(room) {
      return <Chatroom chatRoomSelected={this.state.chatRoomSelected} hideChatRooms={this.hideChatRooms} showChatRooms={this.showChatRooms} name={room.name} user={this.state.user} id={room.id}/>
    };

    var buttonHtml;
    if (this.state.user == '') {
      buttonHtml = <button className="btn btn-primary" onClick={this.onSubmit} disabled="disabled">Find A Room</button>
    } else {
      buttonHtml = <button className="btn btn-primary" onClick={this.onSubmit} >Find A Room</button>
    }

    return (<div>
      {this.state.showDisplayName ?
      <div><h3>Choose a Display Name</h3><input className="form-control" placeholder="Enter your display name"
      onChange={this.onDisplayNameChange} value={this.state.user} />
      {buttonHtml}</div> : null }
      {this.state.showRooms ? <div><ul class="roomlist">{this.state.rooms.map(renderRoom, this)}</ul></div> : null }
      </div>
      );
  }
});

module.exports = ASAPPChatApp;
