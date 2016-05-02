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
import Movie from './android_views/movie/movie';
import Music from './android_views/music/music';
import Navigation from './android_views/common/navigation';


class doubanSearch extends Component {
  render() {
    return (
      <Navigation component={Music}/>
    );
  }
};

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('doubanSearch', () => doubanSearch);
