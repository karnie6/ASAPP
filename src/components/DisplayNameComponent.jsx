var React = require('react');

var DisplayNameComponent = React.createClass({
  getInitialState: function() {
    return {value: ""};
  },
  onChange: function(e) {
    this.setState({value: e.target.value});
  },
  render: function() {
    return (<div><h3>Step #1: Choose a Display Name</h3><input className="form-control" placeholder="Enter your display name" onChange={this.onChange} value={this.state.value} />
</div>);
  }
});

module.exports = DisplayNameComponent;
