/**
 * 封装Navigator
 * 所有的切换过场动画都是从底部往上，回退是从上往下
 */

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

export default class extends Component {

  render() {

    return (

      <Navigator

        initialRoute={{name: 'FirstPage', component: this.props.component}}
        configureScene={()=>{return Navigator.SceneConfigs.FloatFromBottom;}}

        renderScene={(route, navigator) => {
          var Component = route.component;
          return (
            <View style={{flex: 1}}>
              <Component navigator={navigator} {...route.passProps}/>
            </View>
          );
        }}

      />

    );

  }

};
