var React = require('react');
var socket = io.connect('/messages');

var Chatroom = React.createClass({
  getInitialState: function() {
    return {showFullChatWindow: false, currentMessage: '', messages: [], unreadMessageCount: 0};
  },
  componentDidMount: function() {
    socket.on('connect', this.initialize);
    socket.on('messagefeed', this.updateMessages);
  },
  initialize: function() {
  },
  sendMessage: function() {
    this.setState({currentMessage: ''});
    socket.emit('newMessage', {'messageText': this.state.currentMessage,'roomNumber':this.props.id, 'user':this.props.user});
  },
  updateMessages: function(newmessage) {
    var newMessageJson = JSON.parse(newmessage)

    if (newMessageJson.roomNumber == this.props.id) {
      var currentMessages = this.state.messages;
      var currentUnreadMessageCount = this.state.unreadMessageCount;
      currentMessages.push(newMessageJson);
      this.setState({messages: currentMessages, unreadMessageCount: currentUnreadMessageCount+1});
    }
  },
  onChange: function(e) {
    this.setState({currentMessage: e.target.value});
  },
  joinRoom: function(e) {
    e.preventDefault();
    socket.emit('joinroom', {'roomNumber':this.props.id, 'user':this.props.user});
    this.setState({showFullChatWindow: true, unreadMessageCount: 0});
  },
  render: function() {
    var renderMessage = function(message) {
      return (<div class="msgbox">
      						<div class="user">{message.user}</div>
      						<div class="msg"><p>{message.messageText}</p></div>
      					</div>);
    }

    var latestMessage = '';


    if (this.state.showFullChatWindow) {
      return (<div class="rm-container">
  		<div class="rm-roomname">
  			<h5>{this.props.name}</h5>
  		</div>
  		<div class="rm-messages">
  			<ul class="messages">
  				<li>
            {this.state.messages.map(renderMessage)}
  				</li>
  			</ul>
  		</div>
  		<div class="rm-newmessage"><input type="text" onChange={this.onChange} value={this.state.currentMessage} class="newmessage" placeholder="Type in your message and press Send!"/><button className="btn btn-primary" onClick={this.sendMessage}>Send</button></div>
  	</div>);
    } else {
      if (this.state.messages.length > 0) {
        latestMessage = this.state.messages[this.state.messages.length - 1].messageText;
      }
      return (<li id={this.props.id}>{this.props.name}<button className="btn btn-primary" onClick={this.joinRoom}>Join</button><span>Latest Message: {latestMessage}. Unread Message Count: {this.state.unreadMessageCount}</span></li> );
    }

  }
});

module.exports = Chatroom;
