/**
 * 电影模块，电影的详情页是 WebView 内嵌豆瓣 WebApp 来实现
 */

import Search from '../common/search';
import Util from '../common/util';
import ServiceURL from '../common/service';
import WebView from '../common/webview';

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

  constructor(props) {

    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([]),                // 承载搜索到的 movies 信息数组
      keywords: '西游记',                                // 搜索关键字
      show: false                                      // 控制 loading 动画开关
    };

  }

  render() {

    return (
      <ScrollView style={styles.flex_1}>

        <View style={[styles.search, styles.row]}>

          <View style={styles.flex_1}>
            <Search placeholder="请输入电影的名称" onChangeText={this._changeText.bind(this)}/>
          </View>

          <TouchableOpacity style={styles.btn} onPress={this._search.bind(this)}>
            <Text style={styles.fontFFF}>搜索</Text>
          </TouchableOpacity>

        </View>

        {
          this.state.show
          ?
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
            />
          :
            Util.loading
        }

      </ScrollView>
    );

  }

  // 页面加载完成后，获取数据
  componentDidMount() {
    this._getData();
  }

  // 搜索框中内容变化时触发
  _changeText(val) {
    this.setState({
      keywords: val
    });
  }

  // 搜素按钮点击后触发，获取数据
  _search() {
    this._getData();
  }

  // 定义渲染电影 item 的模板
  _renderRow(row) {

    var casts = row.casts;                          // 获取主演信息
    var names = [];

    for(var i in casts) {                           // 遍历主演的姓名，放入 names 数组中
      names.push(casts[i].name);
    }

    return (
      <View style={[styles.row, styles.item]}>

        <View>
          <Image style={styles.img} source={{uri: row.images.medium}}/>
        </View>

        <View>

          <Text style={styles.textWidth} numberOfLines={1}>
            名称： {row.title}
          </Text>

          <Text style={styles.textWidth} numberOfLines={1}>
            演员： {names.join('、')}
          </Text>

          <Text style={styles.textWidth} numberOfLines={1}>
            评分： {row.rating.average}
          </Text>

          <Text style={styles.textWidth} numberOfLines={1}>
            时间： {row.year}
          </Text>

          <Text style={styles.textWidth} numberOfLines={1}>
            标签： {row.genres.join('、')}
          </Text>

          <TouchableOpacity
            style={styles.goDou}
            onPress={this._goDouBan.bind(this, row.title, row.alt)}
          >
            <Text>详情</Text>
          </TouchableOpacity>

        </View>

      </View>
    );

  }

  // 根据关键字，从豆瓣 API 请求数据
  _getData() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var that = this;
    var baseURL = ServiceURL.movie_search + '?count=30&q=' + this.state.keywords;

    // 请求数据前开启 loading 动画
    this.setState({
      show: false
    });

    // 每次请求30条 movies 数据
    Util.get(baseURL, function(data) {

      if(!data.subjects || !data.subjects.length) {
        return alert('电影服务出错');
      }

      var subjects = data.subjects;
      that.setState({
        dataSource: ds.cloneWithRows(subjects),
        show: true
      });

    }, function(err) {
      alert(err);
    });

  }

  // 点击详情按钮时触发事件
  _goDouBan(title, url) {

    this.props.navigator.push({
      component: WebView,
      passProps: {
        backName: '电影',
        title: title,
        url: url
      }
    });

  }

};

const styles = StyleSheet.create({

  flex_1: {
    flex: 1,
    marginTop: 5,
  },

  search: {
    paddingLeft: 5,
    paddingRight: 5,
    height: 45,
  },

  btn: {
    width: 50,
    backgroundColor: '#0091ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fontFFF: {
    color: '#fff',
  },

  row: {
    flexDirection: 'row',
  },

  img: {
    width: 80,
    height: 110,
    resizeMode: Image.resizeMode.contain,
  },

  textWidth: {
    width: 200,
    marginLeft: 10,
  },

  item: {
    marginTop: 10,
    height: 155,
    paddingTop: 15,
    paddingLeft: 10,
    borderBottomWidth: Util.pixel,
    borderTopWidth: Util.pixel,
    borderColor: '#ddd',
  },

  goDou: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 60,
    borderWidth: Util.pixel,
    borderColor: '#3c9bfd',
    marginLeft: 30,
    marginTop: 5,
    borderRadius: 3,
  },

});
