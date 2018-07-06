import React, { Component } from 'react';
import {TouchableOpacity,View ,Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


import GlobalStyles from '../assets/styles/GlobalStyles'

export default class ViewCommon{
  /**
   * Me页面封装的菜单函数
   *
   * @static
   * @param {*} callBack 
   * @param {*} icon 左侧图标
   * @param {*} text 显示的文本
   * @param {*} tintStyle 图标颜色
   * @param {*} expandableIcon 右侧图标
   * @memberof ViewCommon
   */
  static getSettingItem(callBack,icon,text,tintStyle,expandableIcon){
    return(
      <TouchableOpacity onPress={callBack} >
          <View style={GlobalStyles.itembox}>
            <View style={GlobalStyles.infobox}>
              <Icon name={icon} size={25} style={[GlobalStyles.iconbox,{color: tintStyle }]} />
              <Text style={GlobalStyles.itemtxt}>{text}</Text>
            </View>
            <Icon name={expandableIcon?expandableIcon:'keyboard-arrow-right'} size={30} style={{color: "#6570e2"}} />
          </View>
        </TouchableOpacity> 
       
    )
  }
}