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

import Book from './android_views/book/book_list';
import Navigation from './android_views/common/navigation';


class doubanSearch extends Component {
  render() {
    return (
      <Navigation component={Book}/>
    );
  }
};

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('doubanSearch', () => doubanSearch);
