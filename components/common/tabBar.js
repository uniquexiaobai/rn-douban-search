/**
 * 底部 tabBar
 */

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class extends Component {

  render() {
    return (

      <View style={styles.tab_bar}>

        <TouchableOpacity
          style={styles.tab_item}
          onPress={this.props.switchTab.bind(this, 'Book')}
        >
          <Image
            style={styles.tab_icon}
            source={this.props.tab === 'Book' ? require('../img/book_active.png') : require('../img/book.png')}
          />
          <Text style={[styles.tab_name, this.props.tab === 'Book' ? {color: '#0091ff'} : null]}>图书</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab_item}
          onPress={this.props.switchTab.bind(this, 'Movie')}
        >
          <Image
            style={styles.tab_icon}
            source={this.props.tab === 'Movie' ? require('../img/movie_active.png') : require('../img/movie.png')}
          />
          <Text style={[styles.tab_name, this.props.tab === 'Movie' ? {color: '#0091ff'} : null]}>电影</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab_item}
          onPress={this.props.switchTab.bind(this, 'Music')}
        >
          <Image
            style={styles.tab_icon}
            source={this.props.tab === 'Music' ? require('../img/music_active.png') : require('../img/music.png')}
          />
          <Text style={[styles.tab_name, this.props.tab === 'Music' ? {color: '#0091ff'} : null]}>音乐</Text>
        </TouchableOpacity>

      </View>

    );
  }

};

const styles = StyleSheet.create({
  tab_bar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  tab_item: {
    flex: 1,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 5,
    paddingBottom: 5,
  },
  tab_icon: {
    width: 28,
    height: 28,
  },
  tab_name: {
    color: '#a3a3a3',
    marginTop: 3,
  },
});
