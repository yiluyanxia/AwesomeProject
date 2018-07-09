import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Image,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RepositoriesCell from '../../components/repositoriesCell'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import FavoriteUtil from '../../util/FavoriteUtil'
import {FLAG_STORAGE} from '../../network/DataRepository'
import ProjectModel from '../../util/projectModel'
import Utils from '../../util/utils'
import ActionUtils from '../../util/ActionUtils'
import RepositoryUtils from '../../network/RepositoryUtils'
export const FLAG_ABOUT={flag_about:'flag_about',flag_about_me:'about_me'};

class AboutCommon extends Component {
  constructor(props,updateState,flag_about, config){
    super(props);
    this.props = props;
    this.updateState = updateState;
    this.flag_about = flag_about
    this.config = config
    this.repositories = [];
    this.favoriteKeys = null;
    this.FavoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_popular)
    this.RepositoryUtils =new RepositoryUtils(this);
  }
  componentDidMount(){
    if(this.flag_about === FLAG_ABOUT.flag_about){
      this.RepositoryUtils.fetchRepository(this.config.info.currentRepoUrl)
    } else {
      var urls = [];
      var items = this.config.items;
      for(let i =0,l=items.length;i<l;i++){
        urls.push(this.config.info.url+items[i])
      }
      this.RepositoryUtils.fetchRepositories(urls);

    }
  }

  /**
   *通知数据发生改变
   *
   * @param {*} items 改变的数据
   * @memberof AboutCommon
   */
  onNotifyDataChanged(items){
    this.updateFavorite(items)
  }

  async updateFavorite(repositories){
    if(repositories) this.repositories = repositories;
    if(!this.repositories) return;
    if(!this.favoriteKeys){
      this.favoriteKeys = await this.FavoriteUtil.getFavoriteKeys();
    }
    let projectModels = [];
    for(var i = 0,len= this.repositories.length;i<len;i++){
      var data = this.repositories[i];
      data=data.item? data.item:data
      projectModels.push({
        isFavorite:Utils.checkFavorite(data,this.favoriteKeys?this.favoriteKeys:[]),
        item: data,
      });
    }
    this.updateState({
      projectModels:projectModels
    })
  }


  onSelect(item){
    this.props.navigation.navigate('Detail',{itemVal: item, flag:FLAG_STORAGE.flag_popular})
  }
  // _onFavorite(item,isFavorite){
  //   if(isFavorite){
  //     this.FavoriteUtil.saveFavoriteItem(item.id.toString(),JSON.stringify(item))
  //   }else{
  //     this.FavoriteUtil.removeFavoriteItem(item.id.toString());
  //   }

  // }


  renderRepository(projectModels){
    if(!projectModels || projectModels.length === 0)return null;
    let views = [];
    for(let i=0,l=projectModels.length;i<l;i++){
      let projectModel= projectModels[i];
      views.push(
        <RepositoriesCell dataItem={item} 
          onSelect={this.onSelect.bind(this,item)}
          onFavorite={(item,isFavorite)=>ActionUtils.onFavorite(this.FavoriteUtil,item,isFavorite)}/>
      )
    }
  }

  getParallaxRenderConfig(params){
    let config={};
    config.renderBackground =()=>(
      <View key="background">
        <Image style={styles.header_bg} source={ params.bgPath }/>
      </View>
    );
    config.renderForeground=()=>{

      return (
        <View key="parallax-header" style={ styles.parallax_header }>  
        <Image style={styles.avatar} source={ params.avatar }/>
        <Text style={ styles.header_text }> {params.name} </Text>
        <Text style={ styles.header_desc }>
          {params.desc} 
        </Text>
       </View>
      )
    };
    config.renderStickyHeader=()=>(
      <View key="sticky-header" style={styles.sticky}>
        <Text style={styles.sticky_text}>{params.title}</Text>
      </View>
    );
    config.renderFixedHeader=()=>(
      <View key="fixed-header" style={styles.fixedSection}>
        <TouchableOpacity style={{paddingLeft:20}} onPress={()=>{
          this.props.navigation.goBack();
        }}>
          <Ionicons name="md-arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    )
    return config;
  }
  render(contentView,params){
    let renderConfig  = this.getParallaxRenderConfig(params)
    return (
      <ParallaxScrollView
        headerBackgroundColor="#333"
        stickyHeaderHeight={56}
        parallaxHeaderHeight={ 350 }
        backgroundSpeed={10} 
        {...renderConfig}>

          {contentView}
      </ParallaxScrollView>
    );
  }
}



export default AboutCommon;

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

