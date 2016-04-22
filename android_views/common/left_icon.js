/**
 * 公共头部中的回退按钮
 */

import Util = require('./util');

import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default calss extends Component {

  render() {

    return (
      <View>
        <View style={styles.go}>
        </View>
      </View>
    );

  }

};

const styles = StyleSheet.create({
  go: {
    borderLeftWidth: 4 * Util.pixel,
    borderBottomWidth: 4 * Util.pixel,
    width: 15,
    height: 15,
    transform: [{rotate: '45deg'}],
    borderColor: '#fff',
    marginLeft: 10,
  },
});
