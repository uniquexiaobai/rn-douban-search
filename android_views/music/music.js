/**
 * 音乐模块
 */

import Search from '../common/search';
import Util from '../common/util';
import ServiceURL from '../common/service';
import webView from '../common/webview';

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
      dataSource: ds.cloneWithRows([]),
      keywords: '童话',
      show: false
    };
  }

  render() {

    return (
      <ScrollView style={styles.flex_1}>

        <View style={[styles.search, styles.row]}>

          <View style={styles.flex_1}>
            <Search placeholder="请输入歌曲/歌手名称" onChangeText={this._changeText.bind(this)}/>
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

    return (
      <View style={styles.item}>

        <View style={styles.center}>
          <Image style={styles.img} source={{uri: row.image}}/>
        </View>

        <View style={styles.row}>
          <Text style={[ styles.flex_1, {marginLeft: 20} ]} numberOfLines={1}>曲目：{row.title}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[ styles.flex_1, {marginLeft: 20} ]} numberOfLines={1}>时间：{row.attrs['pubdate']}</Text>
          <Text style={styles.textWidth} numberOfLines={1}>评分：{row['rating']['average']}</Text>
        </View>

        <View style={styles.center}>
          <TouchableOpacity
            style={[styles.goDou, styles.center]}
            onPress={this._goDouBan.bind(this, row.title, row.mobile_link)}
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
    var baseURL = ServiceURL.music_search + '?count=30&q=' + this.state.keywords;

    // 请求数据前开启 loading 动画
    this.setState({
      show: false
    });

    // 每次请求30条 music 数据
    Util.get(baseURL, function(data) {

      if(!data.musics || !data.musics.length) {
        return alert('音乐服务出错');
      }

      var musics = data.musics;
      that.setState({
        dataSource: ds.cloneWithRows(musics),
        show: true
      });

    }, function(err) {
      alert(err);
    });

  }

  // 点击详情按钮时触发事件
  _goDouBan(title, url) {

    this.props.navigator.push({
      component: webView,
      passProps: {
        backName: '音乐',
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
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginTop: 10,
    borderTopWidth: Util.pixel,
    borderBottomWidth: Util.pixel,
    borderColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textWidth: {
    width: 120,
  },
  goDou: {
    height: 35,
    width: 60,
    borderWidth: Util.pixel,
    borderColor: '#3082ff',
    borderRadius: 3,
  },
});
