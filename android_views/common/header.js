/**
 *  公共头部
 */

import Icon from './left_icon';
import Util from './../common/util';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class extends Component {

  // 点击回退事件
  _pop() {
    this.props.navigator.pop();
  }

  render() {

    var obj = this.props.initObj;

    return (
      <View style={styles.header}>

        <TouchableOpacity style={styles.barIcon} onPress={this._pop.bind(this)}>
          <Icon/>
          <Text style={styles.fontFFF}>{obj.backName}</Text>
        </TouchableOpacity>

        <View style={[styles.title]}>
          <Text
            style={[styles.fontFFF]}
            numberOfLines={1}
          >
            {obj.title}
          </Text>
        </View>
        
        <View style={{flex: 1}}>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  header: {
    height: 50,
    backgroundColor: '#3497FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  barIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  fontFFF: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  }
});
