var React = require('react');
var DisplayNameComponent = require('./DisplayNameComponent.jsx');
var Rooms = require('./Rooms.jsx');

var Signup = React.createClass({
  getInitialState: function() {
    return {showRooms: false}
  },
  onSubmit: function() {
    this.setState({showRooms: true});
  },
  render: function() {
    return (<div>
      <DisplayNameComponent ref="displayName" /><button className="btn btn-primary" onClick={this.onSubmit}>Find A Room</button>
      {this.state.showRooms ? <Rooms displayName={this.refs.displayName.state.value}/> : null }
      </div>
      );
  }
});

module.exports = Signup;
