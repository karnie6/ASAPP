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
    this.props.hideChatRooms();
  },
  render: function() {
    var renderMessage = function(message) {
      return (
        <li className="left clearfix">
            <div className="chat-body clearfix">

                {message.user == this.props.user ? <div className="header"><strong className="primary-font">{message.user}</strong><p>{message.messageText}</p></div> : <div className="header"><strong className="primary-font pull-right">{message.user}</strong><p style={{clear: 'both'}} className="pull-right">{message.messageText}</p></div>}

            </div>
        </li>);
    }

    var latestMessage = '';


    if (this.state.showFullChatWindow) {
      return (
      <div className="row">
        <div className="panel panel-primary">
          <div className="panel-heading">{this.props.name}</div>
  		    <div className="panel-body">
            <ul className="chat">
              {this.state.messages.map(renderMessage, this)}
            </ul>
          </div>
          <div className="panel-footer">
                    <div className="input-group">
                        <input id="btn-input" type="text" className="form-control input-sm" onChange={this.onChange} value={this.state.currentMessage} placeholder="Type your message here..." />
                        <span className="input-group-btn">
                            <button className="btn btn-success" id="btn-chat" onClick={this.sendMessage}>
                                Send</button>
                        </span>
                    </div>
          </div>
        </div>
  	</div>);
  } else if (this.props.chatRoomSelected) {
    return null;
  } else {
      if (this.state.messages.length > 0) {
        latestMessage = this.state.messages[this.state.messages.length - 1].messageText;
      }
      return (<li id={this.props.id}>{this.props.name}<button className="btn btn-success" onClick={this.joinRoom}>Join</button><span>Latest Message: {latestMessage}. Unread Message Count: {this.state.unreadMessageCount}</span></li> );
    }

  }
});

module.exports = Chatroom;
