/**
 * 豆瓣搜索
 * https://github.com/uniquexiaobai/rn-douban-search.git
 */

import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
} from 'react-native';

import Navigation from './components/common/navigation';
import App from './components/App';


class doubanSearch extends Component {

  render() {
    return (
      <Navigation component={App}/>
    );
  }

};

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('doubanSearch', () => doubanSearch);
