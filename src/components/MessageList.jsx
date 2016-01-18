var React = require('react');
var Message = require('Message.jsx');

var MessageList = React.createClass({
  render: function() {
    return (
      <Message user="testUser" text="message"/>);
  }
});

module.exports = MessageList;
