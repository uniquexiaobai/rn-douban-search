/**
 * 电影模块，电影的详情页是 WebView 内嵌豆瓣 WebApp 来实现
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

  construct(props) {

    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([]),
      keywords: '幸福',
      show: false
    };

  }

  render() {

    return (
      <ScrollView style={styles.flex_1}>

        <View style={[styles.search, styles.row]}>
          <View>
            <Search placeholder="请输入电影名称" onChangeText={this._changeText}/>
          </View>
          <TouchableOpacity style={styles.btn} onPress={this._search}>
            <Text style={styles.fontFFF}>搜索</Text>
          </TouchableOpacity>
        </View>

        {
          this.state.show
          ?
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
            />
          :
            Util.loading
        }

      </ScrollView>
    );

  }

  componentDidMount() {
    this._getData();
  }

  _changeText(val) {
    this.setState({
      keywords: val
    });
  }

  _search() {
    this._getData();
  }

  _renderRow(row) {

    var casts = row.casts;
    var names = [];

    for(var i in casts) {
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
            演员： {names}
          </Text>

          <Text style={styles.textWidth} numberOfLines={1}>
            评分： {row.rating.average}
          </Text>

          <Text style={styles.textWidth} numberOfLines={1}>
            时间： {row.year}
          </Text>

          <Text style={styles.textWidth} numberOfLines={1}>
            标签： {row.genres}
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

  _getData() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var that = this;
    var baseURL = ServiceURL.movie_search + '?count=10&q=' + this.state.keywords;

    this.setState({
      show: false
    });

    Util.get(baseURL, function(data) {

      if(!data.subjects || !data.subjects.length) {
        return alert('电影服务出错');
      }

      var subjects = data.subjects;
      that.setState({
        dataSource: ds.cloneWidthRows(subjects),
        show: true
      });

    }, function(err) {
      alert(err);
    });

  }

  _goDouBan(title, url) {

    this.props.navigator.push({
      component: WebView,
      passProps: {
        backName: '电影',
        title: title,
        url: url
      };
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
    height: 140,
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
    marginTop: 10,
    borderRadius: 3,
  },

});
