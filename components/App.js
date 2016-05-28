/**
 * 入口组件
 */

import Book from './book/book_list';
import BookDetail from './book/book_detail';
import Movie from './movie/movie';
import Music from './music/music';
import TabBar from './common/tabBar';

import React, {
  Component,
  StyleSheet,
  View,
  BackAndroid,
  StatusBar,
} from 'react-native';

export default class extends Component {

  constructor(props) {

    super(props);

    this.state = {
      tab: 'Book'
    };

  }

  /**
   * 绑定处理返回键的处理函数
   */
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backAndroidPress.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidPress.bind(this));
  }

  /**
   * Android上 press 返回键时，如果路由栈还未空 pop()
   */
   backAndroidPress() {
     const {navigator} = this.props;
     const routers = navigator.getCurrentRoutes();
     if(routers.length > 1) {
       navigator.pop();
       return true;
     }
     return false;
   }

  /**
   * 处理 tab 的 onPress 事件
   */
  switchTab(tab) {
    this.setState({
      tab: tab
    });
  }

  /**
   * 切换路由到 detail 页
   */
  goDetail(id) {
    this.props.navigator.push({
      component: BookDetail,
      passProps: {
        id: id
      }
    });
  }

  // 点击不同的 tab 渲染不同 navigation
  getTabComponent() {
    switch(this.state.tab) {
      case 'Movie': return <Movie navigator={this.props.navigator} goDetail={this.goDetail.bind(this)}/>;
      case 'Music': return <Music navigator={this.props.navigator} goDetail={this.goDetail.bind(this)}/>;
      default: return <Book goDetail={this.goDetail.bind(this)}/>;
    }
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <StatusBar
          hidden={true}
        />
        {this.getTabComponent()}
        <TabBar
          tab={this.state.tab}
          switchTab={this.switchTab.bind(this)}
        />
      </View>

    );
  }


};
