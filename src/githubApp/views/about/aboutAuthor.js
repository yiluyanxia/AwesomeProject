import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Image,Dimensions,Linking,Clipboard,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutCommon, { FLAG_ABOUT } from './aboutCommon'

import ViewCommon from '../../components/viewCommon'
import {MORE_MENU} from '../../components/moreMenu'
import config from '../../util/config.json'
var FLAG = {
  REPOSITORY: '开源项目',
  BLOG: {
    name: '技术博客',
    items: {
      PERSONAL_BLOG: {
        title: '个人博客',
        url: 'https://yiluyanxia.site/',
      },
      GITHUB: {
        title: 'GitHub',
        url: 'https://github.com/yiluyanxia',
      },
    }
  },
  CONTACT: {
    name: '联系方式',
    items: {
      Email: {
        title: 'Email',
        account: 'yiluyanxia.x@gmail.com',
      },
    }
  },
  OFFICIAL_ACCOUNTS: {
    name: '微信公众号',
    items: {
      YLYX: {
        title: '公众号',
        account: '一路眼瞎',
      },
    },
  },
};

class AboutAuthor extends Component {
  constructor(props){
    super(props);
    this.AboutCommon = new AboutCommon(props,(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about_me,config)
    this.state={
      projectModels:[],
      author:config.author,
      showRepository:false,
      showBlog:false,
      showOfficialAccounts:false,
      showContact:false
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
  getClickIcon(isShow){
    return isShow? 'keyboard-arrow-down':'keyboard-arrow-up'
  }

  onClick(tab){
    let TargetComponent,params={...this.props, menuType:tab};
    switch(tab){
      case FLAG.REPOSITORY:
        this.updateState({showRepository:!this.state.showRepository});
        break;
      case FLAG.BLOG:
        this.updateState({showBlog:!this.state.showBlog});
        break; 
      case FLAG.BLOG.items.CSDN:
      case FLAG.BLOG.items.PERSONAL_BLOG:
      case FLAG.BLOG.items.JIANSHU:
      case FLAG.BLOG.items.GITHUB:
        TargetComponent = 'WebView'; 
        params.url = tab.url;
        params.title = tab.title
        break;
      case FLAG.OFFICIAL_ACCOUNTS:
        this.updateState({showOfficialAccounts:!this.state.showOfficialAccounts});
        break; 
      case FLAG.CONTACT:
        this.updateState({showContact:!this.state.showContact});
        break;
      case FLAG.CONTACT.items.Email:
        var url='mailto://'+tab.account
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL(url);
          }
        }).catch(err => console.error('An error occurred', err));
        break;
      case FLAG.OFFICIAL_ACCOUNTS.items.YLYX:
        Clipboard.setString(tab.account);
        Alert.alert('公众号:'+tab.account+'已复制到剪切板');
        break;
    }
    if(TargetComponent){
      this.props.navigation.navigate(TargetComponent,{...params})
    }

  }

  renderItems(dic,isShowAccount){
    if(!dic)return null;
    let views = [];
    for(let i in dic){
      let title = isShowAccount ? dic[i].title + ':' +dic[i].account:dic[i].title;
    
      views.push(
        <View key={i}>
          { ViewCommon.getSettingItem(()=>this.onClick(dic[i]),'',title,'#6570e2') }
        </View>
      )
    }
    return views;
  }

  render() {
    const { onScroll = () => {} } = this.props;
    let content = <View>
    {ViewCommon.getSettingItem(()=>{this.onClick(FLAG.BLOG)},'import-contacts',FLAG.BLOG.name,'#6570e2',this.getClickIcon(this.state.showBlog))}
    {this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null}

    {/* {ViewCommon.getSettingItem(()=>{this.onClick(FLAG.REPOSITORY)},'share',FLAG.REPOSITORY,'#6570e2',this.getClickIcon(this.state.showRepository))}
    {this.state.showRepository?this.AboutCommon.renderRepository(this.state.projectModels):null} */}

    {ViewCommon.getSettingItem(()=>{this.onClick(FLAG.CONTACT)},'contacts',FLAG.CONTACT.name,'#6570e2',this.getClickIcon(this.state.showContact))}
    {this.state.showContact?this.renderItems(FLAG.CONTACT.items,true):null}

    {ViewCommon.getSettingItem(()=>{this.onClick(FLAG.OFFICIAL_ACCOUNTS)},'account-box',FLAG.OFFICIAL_ACCOUNTS.name,'#6570e2',this.getClickIcon(this.state.showOfficialAccounts))}
    {this.state.showOfficialAccounts?this.renderItems(FLAG.OFFICIAL_ACCOUNTS.items,true):null}

    </View>
    return this.AboutCommon.render(content,{
      'title':'About Author',
      'name':'Yiluyanxia',
      'desc':'Yiluyanxia is a beginner and crazy about programme.',
      'avatar': require('../../assets/images/avatar.jpg'),
      'bgPath': require('../../assets/images/bg2.jpg')
    }) 
  }
}



export default AboutAuthor;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  },
})

