var React = require('react');
var DisplayNameComponent = require('./DisplayNameComponent.jsx');

var Rooms = React.createClass({
  render: function() {
    var chatRooms = [];

    for (var i = 0; i < this.props.rooms.length; i++) {
      chatRooms.push(<li>{this.props.rooms[i]}</li>);
    }

    return (<div>
      <div class="cr-userbox">
			<h3 class="userName">Step #2: Hello {this.props.displayName}, please choose the chatroom you'd like to enter:</h3>
		</div>
		<div class="cr-roomlist"></div>
    <ul class="roomlist">
    {chatRooms}
    </ul>
    </div>);
  }
});

module.exports = Rooms;
