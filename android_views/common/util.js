/**
 *  Util模块工具类
 *  主要提供工具方法
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var ProgressBarAndroid = require('ProgressBarAndroid');

module.exports = {
  // 最小线宽
  pixel: 1 / PixelRatio.get(),

  // 屏幕尺寸
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  // 加载动画
  loading: <ProgressBarAndroid
    styleAttr="Inverse"
    color="red"
  />,

  /**
   * 基于fetch的get方法
   * @param  {string} url             get请求的url地址
   * @param  {function} successCallback 成功时的回调函数
   * @param  {function} failCallback    失败时的回调函数
   * @return {[type]}                 [description]
   */
  get: function(url, successCallback, failCallback) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err) {
        failCallback(err);
      });
  },
};
