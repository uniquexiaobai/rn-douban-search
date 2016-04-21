/**
 * 使用WebView封装了豆瓣的WebApp页面
 */

var React = require('react-native');
var Util = require('./util');
var Header = require('./header');

var {
  WebView,
  View
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View>

        <Header
          navigator={this.props.navigator}
          initOjb={{
            backName: this.props.backName,
            title: this.props.title
          }}
        />

        <WebView
          contentInset={{top: -40}}
          startInLoadingState={true}               
          style={{
            width: Util.size.width
            height: Util.size.height - 50
          }}
          url={this.props.url}
        >
        </WebView>

      </View>
    );
  }
})
