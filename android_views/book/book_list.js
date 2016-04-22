
/**
 * 图书列表组件
 */

import Search from '../common/search';
import Util from '../common/util';
import ServiceURL from '../common/service';
import BookItem from './book_items';
import BookDetail from './book_detail';

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

  getInitialState() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      datasource: ds.cloneWithRows([]),
      keywords: 'Java语言',
      show: false
    };

  }

  render() {

    return (
      <ScrollView style={styles.flex_1}>

        // 头部搜索组件
        <View style={[styles.search, styles.row]}>

          // 搜索框
          <View style={styles.flex_1}>
            <Search placeholder="请输入图书的名称" onChangeText={this._changeText}/>
          </View>

          // 搜索按钮
          <TouchableOpacity style={styles.btn} onPress={this._search}>
            <Text style={styles.fontFFF}>搜索</Text>
          </TouchableOpacity>

        </View>

        {
          this.state.show ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
          : Util.loading
        }

      </ScrollView>
    );

  }

  // 渲染图书列表模板
  _renderRow() {
    return (
      <BookItem row={row} onPress={this._loadPage.bind(this, row.id)}/>
    );
  }

  // 第一次页面加载完成后请求数据
  componentDidMount() {
    this.getData();
  }

  // 根据关键字查询
  getDate() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var that = this;
    var baseURL = ServiceURL.book_search + '?count=10&q=' + this.state.keywords;

    // 请求数据前 loading
    that.setState({
      show: false
    });

    // 通过关键字从豆瓣API，请求10条book数据
    Util.get(baseURL, function(data) {

      if(!data.books || !data.books.length) {
        return alert('图书服务出错');
      }

      var books = data.books;

      // 将请求的 books 数据传递给 state，并停止 loading
      that.setState({
        dataSource: ds.cloneWithRows(books),
        show: true
      });

    }, function(err) {

      alert(err);

    });

  }

  // 搜索框中关键字改变事件
  _changeText() {
    this.setState({
      keywords: val
    });
  }

  // 搜索按钮点击后触发事件
  _search() {
    this.getData();
  }

  // 每条图书条目点击事件，点击后路由切换到详情页
  _loadPage() {
    this.props.navigator.push({
      component: BookDetail,
      passProps: {
        id: id
      }
    });
  }

};

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
    marginTop: 5
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
    color: '#fff'
  },
  row: {
    flexDirection: 'row',
  },
});
