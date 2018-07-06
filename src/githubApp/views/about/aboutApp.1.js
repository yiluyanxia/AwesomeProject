import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Image,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import ViewCommon from '../../components/viewCommon'
import {MORE_MENU} from '../../components/moreMenu'

class AboutApp extends Component {
  static navigationOptions = {
    title: 'About App',
    // headerStyle:{
    //   backgroundColor: '#6570e2',
    //   height:56,
    // }
  };

  onClick(tab){
    let TargetComponent,params={...this.props, menuType:tab};
    switch(tab){
      case MORE_MENU.Custom_Language:
        TargetComponent = 'CustomTag';
        params.flag = FLAG_LANGUAGE.flag_language;
        params.isRemove = false;
        break;
      case MORE_MENU.Custom_Theme:
        break;
      case MORE_MENU.About:
        break;
      case MORE_MENU.About_Author:
        break;

    }
    if(TargetComponent){
      this.props.navigation.navigate(TargetComponent,{isRemove:params.isRemove,flag:params.flag})
    }

  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          onScroll={onScroll}
          headerBackgroundColor="#333"
          stickyHeaderHeight={56}
          parallaxHeaderHeight={ 350 }
          backgroundSpeed={10}
          renderBackground={() => (
            <View key="background">
              <Image style={styles.header_bg} source={require('../../assets/images/bg.jpg')}/>
            </View>
          )}
          renderForeground={() => (
            <View key="parallax-header" style={ styles.parallax_header }>  
              <Image style={styles.avatar} source={require('../../assets/images/avatar.jpg')}/>
              <Text style={ styles.header_text }>Github APP      </Text>
              <Text style={ styles.header_desc }>
                This is a github APP from a beginner. And this is from teacher feng.
              </Text>
            </View>
          )}
          renderStickyHeader={() => (
            <View key="sticky-header" style={styles.sticky}>
              <Text style={styles.sticky_text}>About App</Text>
            </View>
          )}

          renderFixedHeader={() => (
            <View key="fixed-header" style={styles.fixedSection}>
              <TouchableOpacity style={{paddingLeft:20}} onPress={()=>{
                this.props.navigation.goBack();
              }}>
                <Ionicons name="md-arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}>
            {ViewCommon.getSettingItem(()=>{this.onClick(MORE_MENU.Website)},'web','Website','#6570e2')}
            {ViewCommon.getSettingItem(()=>{this.onClick( MORE_MENU.Feedback)},'feedback','Feedback','#6570e2')}
          </ParallaxScrollView>


     </View>
    );
  }
}



export default AboutApp;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  },
  render_bg:{
    width:window.width,
    height:350,
  },
  parallax_header:{
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar:{
    width:120,
    height:120,
    borderRadius:60,
    marginBottom: 10,
  },
  header_text:{
    color: 'white',
    fontSize: 22,
    paddingVertical: 5
  },
  header_desc:{
    color: 'white',
    fontSize: 18,
    paddingVertical: 5,
    margin: 10,
  },
  sticky:{
    height:56,
    backgroundColor:'#6570e2',
    width:window.width,
    justifyContent: 'center',
  },
  sticky_text:{
    color: 'white',
    fontSize: 20,
    textAlign:'center'
  },
  fixedSection:{
    position:'absolute',
    left:10,
    right:0,
    bottom: 0,
    top:17,
  }
})

