var React = require('react');
var Router = require('react-router');
var socket = io.connect('/messages');


var JoinChatRoomDisplay = React.createClass({
  getInitialState: function() {
    return {latestMessage: ''};
  },
  componentDidMount: function() {
    socket.on('connect', this.initialize);
  //  socket.on('joinroom', this.joinRoom2);
  },
  joinRoom: function(e) {
    //e.preventDefault();
    socket.emit('joinroom', {'roomNumber':this.props.id, 'user':this.props.user});
    //need to find better way to do this via react router
    window.location.href= "/chatroom/" + this.props.id;
  },
  render: function() {
    return (<li id={this.props.id}>{this.props.name}<a href={"chatroom/" + this.props.id} className="btn btn-primary" onClick={this.joinRoom}>Join</a></li>);
  }
});

module.exports = JoinChatRoomDisplay;
