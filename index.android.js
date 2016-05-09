/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
} from 'react-native';

import Navigation from './android_views/common/navigation';
import App from './android_views/App';


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
