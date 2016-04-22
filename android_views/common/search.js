/**
 * 搜索框组件
 */

import Util from './util';

import React, {
  Component,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

export default class extends Component {

  render() {

    return (
      <View style={styles.flex_1}>
        <TextInput style={[styles.flex_1, styles.input]} {...this.props}/>
      </View>
    );

  }

};

const styles = StyleSheet.create({
  flex_1: {
    flex: 1
  },
  input: {
    borderWidth: Util.pixel,
    height: 40,
    borderColor: '#DDD',
    paddingLeft: 5
  }
});
