import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,ScrollView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FLAG_LANGUAGE } from '../../util/LanguageUtil';
import MoreMenu from '../../components/moreMenu'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import ViewCommon from '../../components/viewCommon'
import {MORE_MENU} from '../../components/moreMenu'
class Me extends Component {
  static navigationOptions = {
    title: 'Me',
  };

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
                <Ionicons name='logo-github' size={38} style={[styles.iconbox,{color: "#6570e2"}]} />
                <Text style={styles.itemtxt}>Github Popular</Text>
              </View>
              <Icon name="chevron-right" size={30} style={{color: "#6570e2"}} />
            </View>
          </TouchableOpacity> 

          <Text style={styles.group_title}>Trending</Text>
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Custom_Language)},'playlist-add-check','Custom Language','#6570e2')}
          {ViewCommon.getSettingItem(()=>{this.onClick( MORE_MENU.Sort_Language)},'format-line-spacing','Sort Language','#6570e2')}

          <Text style={styles.group_title}>Popular</Text>
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Custom_Key)},'playlist-add-check','Custom Tag','#6570e2')}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Sort_Key)},'format-line-spacing','Sort Tag','#6570e2')}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Remove_Key)},'remove-circle-outline','Remove Tag','#6570e2')}

          <Text style={styles.group_title}>Settings</Text>
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Custom_Theme)},'color-lens','Custom Theme','#6570e2')}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.About)},'info-outline','About','#6570e2')}
          {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.About_Author)},'person-outline','About_Author','#6570e2')}
          
        </ScrollView>

        


        {/* <Text onPress={()=>{
          navigate('CustomTag',{isRemove:false,flag:FLAG_LANGUAGE.flag_key})}}>tap me to CustomTag</Text>

        <Text onPress={()=>{
          navigate('CustomTag',{isRemove:false,flag:FLAG_LANGUAGE.flag_language})}}>tap me to Custom Language</Text>

        <Text onPress={()=>{
          navigate('SortTag',{flag:FLAG_LANGUAGE.flag_key})}}>tap me to sortTag</Text>

        <Text onPress={()=>{
          navigate('SortTag',{flag:FLAG_LANGUAGE.flag_language})}}>tap me to sort Language</Text>

        <Text onPress={()=>{
          navigate('CustomTag',{isRemove:true})}}>tap me to RemoveTag</Text> */}
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


