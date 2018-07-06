import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Image,Dimensions,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutCommon, { FLAG_ABOUT } from './aboutCommon'

import ViewCommon from '../../components/viewCommon'
import {MORE_MENU} from '../../components/moreMenu'
import config from '../../util/config.json'

class AboutApp extends Component {
  constructor(props){
    super(props);
    this.AboutCommon = new AboutCommon(props,(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about,config)
    this.state={
      projectModels:[]
    }
  }
  componentDidMount(){
    this.AboutCommon.componentDidMount();
  }

  updateState(dic){
    this.setState(dic)
  }
  static navigationOptions = {
    title: 'About App',
  };

  onClick(tab){
    let TargetComponent,params={...this.props, menuType:tab};
    switch(tab){
      case MORE_MENU.Website:
        TargetComponent = 'WebView';
        params.title = 'Website';
        params.url = 'https://github.com/yiluyanxia/AwesomeProject';
        break;       
      case MORE_MENU.Feedback:
        var url='mailto://yiluyanxia.x.gmail.com'
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL(url);
          }
        }).catch(err => console.error('An error occurred', err));
        break; 
      case MORE_MENU.About_Author:
        TargetComponent = 'AboutAuthor';
        break;   
    }
    if(TargetComponent){
      this.props.navigation.navigate(TargetComponent,{...params})
    }

  }

  render() {
    const { onScroll = () => {} } = this.props;
    let content = <View>
    {this.AboutCommon.renderRepository(this.state.projectModels)}
    {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Website)},'web','Website','#6570e2')}
    {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Feedback)},'feedback','Feedback','#6570e2')}
    {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.About_Author)},'visibility-off','About Author','#6570e2')}</View>
    return this.AboutCommon.render(content,{
      'title':'About App',
      'name':'Github App',
      'desc':'This is a github APP from a beginner. And this is from teacher feng.',
      'avatar': require('../../assets/images/avatar_github.jpg'),
      'bgPath': require('../../assets/images/bg.jpg')
    }) 
  }
}



export default AboutApp;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  },
})

