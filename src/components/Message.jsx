var React = require('react');

var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
      {this.props.user}: {this.props.text}
      </div>);
  }
})

module.exports = Message;
