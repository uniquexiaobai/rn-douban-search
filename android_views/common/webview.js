/**
 * 使用WebView封装了豆瓣的WebApp页面
 */

import Util from './util';
import Header from './header';

import React, {
  Component,
  View,
  WebView,
} from 'react-native';

export default class extends Component {

  render() {

    return (
      <View>

        <Header
          navigator={this.props.navigator}
          initObj={{
            backName: this.props.backName,
            title: this.props.title
          }}
        />

        <WebView
          contentInset={{top: -40}}
          startInLoadingState={true}
          style={{
            width: Util.size.width,
            height: Util.size.height - 50
          }}
          url={this.props.url}
        >
        </WebView>

      </View>
    );

  }

};
