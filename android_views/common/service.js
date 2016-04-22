/**
 * 服务URL
 * 基于豆瓣开放API的图书、音乐和电影服务
 *
 */

const baseURL = 'https://api.douban.com/v2/';      // API 前缀

export default {

  // 图书搜索
  book_search: baseURL + 'book/search',
  // 图书详情
  book_search_id: baseURL + 'book/',

  // 音乐搜索
  music_search: baseURL + 'music/search',
  // 音乐详情
  music_search_id: baseURL + 'music/',

  // 电影搜索
  movie_search: baseURL + 'movie/search',
  // 电影详情
  movie_search_id: baseURL + 'movie/subject/',

};
