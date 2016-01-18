var React = require('react');

var Chatroom = React.createClass({
  render: function() {
    return (<div>
      <div class="cr-userbox">
			<h3 class="userName">Hello {{user}}, choose the chatroom you'd like to enter:</h3>
		</div>
		<div class="cr-roomlist"></div>
    </div>);
  }
});

module.exports = Chatroom;
