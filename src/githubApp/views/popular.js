import React, { Component } from 'react';
import { StyleSheet,View, FlatList,Alert,Text,ScrollView,DeviceEventEmitter,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ModalDropdown from 'react-native-modal-dropdown'
import MoreMenu,{MORE_MENU} from '../components/moreMenu'
import RepositoriesCell from '../components/repositoriesCell'
import LanguageUtil,{FLAG_LANGUAGE} from '../util/LanguageUtil'
import FavoriteUtil from '../util/FavoriteUtil'
import ProjectModel from '../util/projectModel';
import Utils from '../util/utils';
import ActionUtils from '../util/ActionUtils'
import BaseComponent from '../components/baseComponent'

const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR ="&sort=star"
const POPULAR_MOREMENU_OPTIONS = [
  MORE_MENU.Custom_Key, MORE_MENU.Sort_Key, MORE_MENU.Remove_Key, MORE_MENU.Custom_Theme, MORE_MENU.About_Author, MORE_MENU.About 
]


class Popular extends BaseComponent {
  constructor(props){
    super(props);
    this.LanguageUtil = new LanguageUtil(FLAG_LANGUAGE.flag_key);
    this.state={
      languages:[],
      theme: {}
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ themeColorStr: this.themeColorVal()});
  }

  themeColorVal(){
    return this.state.theme.themeColor
    // return 'red'
  }

  componentDidMount(){
    super.componentDidMount();

    this._loadData();
    this.listenerPopular= DeviceEventEmitter.addListener('savaKey_search',()=>{
      this._loadData();
    })
  }

  componentWillUnmount(){
    if(this.listenerPopular){
      this.listenerPopular.remove();
    }
  }

  componentWillReceiveProps(nextProps){
    this._loadData();
  }


  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title:'Popular',
      headerLeft:(
        <TouchableOpacity style={{paddingLeft:20}}>
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={styles.headerRight_cont}>
          <TouchableOpacity style={{paddingRight:20}} onPress={()=>{navigation.navigate('Search')}}>
            <Ionicons name="md-search" size={24} color="#fff" />
          </TouchableOpacity>
          <MoreMenu
            options={POPULAR_MOREMENU_OPTIONS}
            onNavigation={(item,itemParams)=>{navigation.navigate(item,itemParams)}} />
        </View>
      ),
     
    };
  };

  

  _loadData(){
    this.LanguageUtil.fetch().then((result) => {
      if(result){
        this.setState({
        languages:result
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }
  
  render() {
    let content = this.state.languages.length>0?
      <ScrollableTabView
        tabBarBackgroundColor={this.state.theme.themeColor}
        tabBarActiveTextColor="#fff"
        tabBarInactiveTextColor="#fefefe"
        tabBarUnderlineStyle={{backgroundColor:"#fff"}}>
        {this.state.languages.map((result,i,arr)=>{
          let lan = arr[i];
          return lan.checked? <PopularTab key={i} tabLabel={lan.name} {...this.props}></PopularTab>: null
        })}
      </ScrollableTabView>
      :null;
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

class PopularTab extends Component{
  constructor(){
    super();
    this.DataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
    this.FavoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_popular)
    this.isFavoriteChanged=false;
    this.state = {
      result:'',
      dataArr:[],
      favoriteKeys:[]
    }
  }
  componentDidMount(){
    this.onLoad();
    this.listener= DeviceEventEmitter.addListener('favoriteChange_popular',()=>{
      this.isFavoriteChanged = true;
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.isFavoriteChanged){
      this.isFavoriteChanged = false
      this.getFavoriteKeys();
    }
  }

  componentWillUnmount(){
    if(this.listener){
      this.listener.remove();
    }
  }

  flushFavoriteState(){
    let projectModelArr= [];
    let items = this.items;
    for(var i=0,len=items.length;i<len;i++){
      projectModelArr.push(new ProjectModel(items[i],Utils.checkFavorite(items[i],this.state.favoriteKeys)))
    }
    this.setState({
      dataArr:projectModelArr
    })

  }

  getFavoriteKeys(){
    this.FavoriteUtil.getFavoriteKeys().then((keys)=>{
      if(keys){
        this.setState({favoriteKeys:keys});
      }
      this.flushFavoriteState();
    }).catch((error)=>{
      this.flushFavoriteState();
      console.log(error);
    })
  }

  onLoad(){
    let url = URL+this.props.tabLabel+QUERY_STR; 
    this.DataRepository.fetchRepository(url).then(result => {
      this.items =result&&result.items?result.items:result?result:[];
      this.getFavoriteKeys();
      if(result&&result.update_date&&!Utils.checkData(result.update_date)){
        // Alert.alert('数据过期')
        return this.DataRepository.fetchNetRepository(url);
      }else{
        // Alert.alert('显示缓存数据')
      }
    }).then(items=>{
      if(!items || items.length===0)return;
      this.items = items;
      this.getFavoriteKeys();
      // Alert.alert('显示网络数据')
    })
    .catch(error=>{
      console.log(error)
    })
  }

  onLoadByHand(){
    let url = URL+this.props.tabLabel+QUERY_STR; 
    this.DataRepository.fetchNetRepository(url).then(result => {
      this.items = result;
    
      this.getFavoriteKeys();
      // Alert.alert('手动刷新网络数据')

    }).catch(error=>{
      console.log(error)
    })
  }
  _onRefresh = () =>{
    this.onLoadByHand()
  }
 
  onSelect(item){
    this.props.navigation.navigate('Detail',{itemVal: item, flag:FLAG_STORAGE.flag_popular})
  }
  
  render(){
    return(
      <View>
        <FlatList
          data={this.state.dataArr}
          keyExtractor = {(item, index) => JSON.stringify(item.id)}
          onRefresh={this._onRefresh}
          refreshing={false}
          renderItem={({item}) => <RepositoriesCell dataItem={item} key={item.id}
          onSelect={this.onSelect.bind(this,item)}
          onFavorite={(item,isFavorite)=>ActionUtils.onFavorite(this.FavoriteUtil,item,isFavorite)}
        />
        }
        />  
      </View>
    )
  }
}


export default Popular;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  },
  headerRight_cont:{
    flexDirection: 'row',
    alignItems: 'center',
    
  }
})
