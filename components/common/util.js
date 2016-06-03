/**
 *  Util模块工具类
 *  主要提供工具方法
 */
import Dimensions from 'Dimensions';
import PixelRatio from 'PixelRatio';

import React, {
  ProgressBarAndroid,
  ActivityIndicatorIOS,
  Platform,
} from 'react-native';

export default {

  /**
   * 获取屏幕最小线宽
   */
  pixel: 1 / PixelRatio.get(),

  /**
   * 获取屏幕尺寸
   */
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  /**
   * Anroid/ios 加载动画
   * Platform.OS 在此判断响应的平台
   */
  loading: (Platform.OS === 'ios')
    ?
      <ActivityIndicatorIOS
        color="red"
        size="large"
      />
    :
      <ProgressBarAndroid
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
  get(url, successCallback, failCallback) {
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
