var React = require('react');
var DisplayNameComponent = require('./DisplayNameComponent.jsx');

var Rooms = React.createClass({
  getInitialState: function() {
    return {rooms:["Room A", "Room B", "Room C"]};
  },
  render: function() {
    var chatRooms = [];
    for (var i = 0; i < this.state.rooms.length; i++) {
      chatRooms.push(<li>{this.state.rooms[i]}</li>);
    }

    return (<div>
      <div class="cr-userbox">
			<h3 class="userName">Hello {this.props.displayName}, choose the chatroom you'd like to enter:</h3>
		</div>
		<div class="cr-roomlist"></div>
    <ul class="roomlist">
    {chatRooms}
    </ul>
    </div>);
  }
});

module.exports = Rooms;
