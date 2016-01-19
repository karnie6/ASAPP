var React = require('react');

var emojis = [{"url": "http://emojione.com/wp-content/uploads/assets/emojis/1f600.svg"}, {"url": "http://emojione.com/wp-content/uploads/assets/emojis/1f62c.svg"}, {"url": "http://emojione.com/wp-content/uploads/assets/emojis/1f601.svg"}];

var Emoji = React.createClass({
  getInitialState: function() {
    return ({showFullEmojiSet: false});
  },
  toggleEmojiSet: function() {
    var currentStatus = this.state.showFullEmojiSet;
    this.setState({showFullEmojiSet: !currentStatus});
  },
  render: function() {

    var renderEmoji = function(image) {
      return (
        <li className="emoji-panel-item">
            <div className="chat-body clearfix">
                <img className="emoji" src={image.url}/>
            </div>
        </li>);
    };

    if (this.state.showFullEmojiSet) {
      return (<ul className="emoji">{emojis.map(renderEmoji)}</ul>);
    } else {
      return (<div>
      <img onClick={this.toggleEmojiSet} className="emoji" src={emojis[0].url}/>
      </div>);
    }
  }
});

module.exports = Emoji;
