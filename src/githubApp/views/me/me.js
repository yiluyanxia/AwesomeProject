import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,ScrollView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FLAG_LANGUAGE } from '../../util/LanguageUtil';
import MoreMenu from '../../components/moreMenu'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import ViewCommon from '../../components/viewCommon'
import {MORE_MENU} from '../../components/moreMenu'
import CustomTheme from './customTheme'
import BaseComponent from '../../components/baseComponent'
class Me extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      CustomThemeModalVisible: false,
      theme: {}
    }
  }

  static navigationOptions = {
    title: 'Me',
  };

  renderCustomThemeView(){
    return(
      <CustomTheme 
        modalVisible={this.state.CustomThemeModalVisible}
        {...this.props}
        onClose={()=>{
          this.setState({
            CustomThemeModalVisible:false
          })
        }}
      />
    )
  }
  onClick(tab){
    let TargetComponent,params={...this.props, menuType:tab};
    switch(tab){
      case MORE_MENU.Custom_Language:
        TargetComponent = 'CustomTag';
        params.flag = FLAG_LANGUAGE.flag_language;
        params.isRemove = false;
        break;
      case MORE_MENU.Sort_Language:
        TargetComponent = 'SortTag';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;

      case MORE_MENU.Custom_Key:
        TargetComponent = 'CustomTag';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemove = false;
        break;
      case MORE_MENU.Sort_Key:
        TargetComponent = 'SortTag';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemove = false;
        break;
      case MORE_MENU.Remove_Key:
        TargetComponent = 'CustomTag';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemove = true;
        break;

      case MORE_MENU.Custom_Theme:
        this.setState({
          CustomThemeModalVisible: true
        })
        break;

      case MORE_MENU.About:
        TargetComponent = 'AboutApp';
        break;
      case MORE_MENU.About_Author:
        TargetComponent = 'AboutAuthor';
        

    }
    if(TargetComponent){
      this.props.navigation.navigate(TargetComponent,{isRemove:params.isRemove,flag:params.flag})
    }

  }

  
  render() {
    // const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('AboutApp')}} >
            <View style={styles.itembox}>
              <View style={styles.infobox}>
                <Ionicons name='logo-github' size={38} style={[styles.iconbox,{color: this.state.theme.themeColor}]} />
                <Text style={styles.itemtxt}>Github Popular</Text>
              </View>
              <Icon name="chevron-right" size={30} style={{color: this.state.theme.themeColor}} />
            </View>
          </TouchableOpacity> 

          <Text style={styles.group_title}>Trending</Text>
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Custom_Language)},'playlist-add-check','Custom Language',this.state.theme.themeColor)}
          {ViewCommon.getSettingItem(()=>{this.onClick( MORE_MENU.Sort_Language)},'format-line-spacing','Sort Language',this.state.theme.themeColor)}

          <Text style={styles.group_title}>Popular</Text>
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Custom_Key)},'playlist-add-check','Custom Tag',this.state.theme.themeColor)}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Sort_Key)},'format-line-spacing','Sort Tag',this.state.theme.themeColor)}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Remove_Key)},'remove-circle-outline','Remove Tag',this.state.theme.themeColor)}

          <Text style={styles.group_title}>Settings</Text>
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Custom_Theme)},'color-lens','Custom Theme',this.state.theme.themeColor)}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.About)},'info-outline','About',this.state.theme.themeColor)}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.About_Author)},'person-outline','About_Author',this.state.theme.themeColor)}
          
        </ScrollView>
        {this.renderCustomThemeView()}
      </View>
    );
  }

}



export default Me;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#eee",
  },
  itembox:{
    height: 90,
    borderBottomWidth:1,
    borderBottomColor: "#bdbdbd",
    marginBottom: 10,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  infobox:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconbox:{
    padding: 10
  },
  itemtxt: {
    fontSize: 18,
  },
  group_title:{
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    color: '#757575'
  }
})


