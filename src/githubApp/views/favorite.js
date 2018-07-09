import React, { Component } from 'react';
import { StyleSheet,View, FlatList,Alert,Text,ScrollView,DeviceEventEmitter,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoriesCell from '../components/repositoriesCell'
import TrendingCell from '../components/trendingCell'
import MoreMenu,{MORE_MENU} from '../components/moreMenu'

import FavoriteUtil from '../util/FavoriteUtil'
import ProjectModel from '../util/projectModel';
import Utils from '../util/utils';
import ArrayUtil from '../util/ArrayUtil'

const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR ="&sort=star"
const FAVORITE_MOREMENU_OPTIONS = [
  MORE_MENU.Custom_Theme, MORE_MENU.About_Author, MORE_MENU.About 
]
class Favorite extends Component {

  constructor(props){
    super(props);
    this.state={
     
    }
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: 'Favorite',
      headerLeft:(
        <TouchableOpacity style={{paddingLeft:20}}>
        </TouchableOpacity>
      ),
      headerRight: (
        <View>
          <MoreMenu
            options={FAVORITE_MOREMENU_OPTIONS}
            onNavigation={(item,itemParams)=>{navigation.navigate(item,itemParams)}} />
        </View>
      ),
    };
  };

  componentDidMount(){
   
  }

  componentWillReceiveProps(){
   
  }
  render() {
    
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarBackgroundColor="#6570e2"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fefefe"
          tabBarUnderlineStyle={{backgroundColor:"#fff"}}>
          <FavoriteTab tabLabel='Popular' flag={FLAG_STORAGE.flag_popular} {...this.props}></FavoriteTab>
          <FavoriteTab tabLabel='Trending' flag={FLAG_STORAGE.flag_trending} {...this.props}></FavoriteTab>
        </ScrollableTabView>
      </View>
    );
  }
}

class FavoriteTab extends Component{
  constructor(props){
    super(props);
    this.FavoriteUtil = new FavoriteUtil(this.props.flag)
    this.unFavoriteItems = [];
    this.state = {
      dataArr:[],
      favoriteKeys:[]
    }
  }
  componentDidMount(){
    this.onLoad()
  }

  componentWillReceiveProps(){
    this.onLoad()   
  }
  onLoad(){
    this.FavoriteUtil.getAllItem().then(items=>{
      var resultData = [];
      for(var i=0,len = items.length;i<len; i++){
        resultData.push(new ProjectModel(items[i],true))
      }
      this.setState({
        dataArr:resultData
      })
    }).catch(e=>{

    })
  }

  _onRefresh = () =>{
    this.onLoad()
  }
 
  onSelect(item){
    this.props.navigation.navigate('Detail',{itemVal: item, flag:FLAG_STORAGE.flag_popular})
  }
  _onFavorite(item,isFavorite){
    var key = this.props.flag === FLAG_STORAGE.flag_popular? item.id.toString():item.fullName;
    if(isFavorite){
      this.FavoriteUtil.saveFavoriteItem(key,JSON.stringify(item))
    }else{
      this.FavoriteUtil.removeFavoriteItem(key);
    }
    ArrayUtil.updateArray(this.unFavoriteItems,item);
    if(this.unFavoriteItems.length>0){
      if(this.props.flag===FLAG_STORAGE.flag_popular){
        DeviceEventEmitter.emit('favoriteChange_popular')
      }else{
        DeviceEventEmitter.emit('favoriteChange_trending')

      }
    }
  }

  render(){
    let FavoriteCell= this.props.flag === FLAG_STORAGE.flag_popular?RepositoriesCell:TrendingCell

    return(
      <View>
        <FlatList
          data={this.state.dataArr}
          keyExtractor = {(item, index) => item.id}
          onRefresh={this._onRefresh}
          refreshing={false}
          renderItem={({item}) => <FavoriteCell dataItem={item} 
          onSelect={this.onSelect.bind(this,item)}
          onFavorite={(item,isFavorite)=>this._onFavorite(item,isFavorite)}
        />
        }
        />  
      </View>
    )
  }
}


export default Favorite;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  }
})
