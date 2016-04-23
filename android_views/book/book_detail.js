/**
 * 图书详情页
 */

import Util from '../common/util';
import ServiceURL from '../common/service';
import BookItem from './book_items';
import Header from '../common/header';

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
    this.state = {
      data: null
    };
  }

  render() {
    return (
      <ScrollView style={styles.m10}>

        {

          this.state.data
          ?

            <View>

              <Header
                navigator={this.props.navigator}
                initObj={{
                  backName: '图书',
                  title: this.state.data.title
                }}
              />

              <BookItem row={this.state.data}/>

              <View>
                <Text style={[styles.title]}>图书简介</Text>
                <Text style={[styles.text]}>{this.state.data.summary}</Text>
              </View>

              <View>
                <Text style={[styles.title]}>作者简介</Text>
                <Text style={[styles.text]}>{this.state.data.author_intro}</Text>
              </View>

              <View style={{height:50}}></View>

            </View>

          : Util.loading

        }

      </ScrollView>
    );
  }

  // 页面加载完成后请求书籍的详细信息
  componentDidMount() {

    var id = this.props.id;
    var url = ServiceURL.book_search_id + '/' + id;
    var that = this;

    Util.get(url, function(data) {
      that.setState({
        data: data
      });
    }, function(err) {
      alert(err);
    });

  }

};

const styles = StyleSheet.create({
  m10: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    color: '#000D22',
  }
});
