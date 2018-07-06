import React, { Component } from 'react';
import { StyleSheet,View, FlatList,Alert,Text,ScrollView,DeviceEventEmitter,TextInput,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoriesCell from '../components/repositoriesCell'
import TrendingCell from '../components/trendingCell'

import FavoriteUtil from '../util/FavoriteUtil'
import ProjectModel from '../util/projectModel';
import Utils from '../util/utils';
import ArrayUtil from '../util/ArrayUtil'

const API_URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'

class Search extends Component {
  constructor(props){
    super(props);
    this.DataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
    this.FavoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_popular)
    this.isFavoriteChanged=false;
    this.state={
      text: '',
      searchVal:'',
      rightIconName:'md-search',
      dataArr:[],
      favoriteKeys:[]
    }
  }
 
  componentDidMount(){
   
  }

  componentWillReceiveProps(){
   
  }

  componentWillMount() {
    // this.props.navigation.setParams({ renderHeaderTitle: ()=> this._renderHeaderTitle() });
    // this.props.navigation.setParams({ goBackFun: this._goBackFun });
  }

  
  // _renderHeaderTitle(){
  //   return (
  //     <View style={styles.textInputWrap}>
  //       <TextInput
  //         placeholder='search'
  //         style={styles.textInput}
  //         underlineColorAndroid = 'transparent'
  //         onChangeText={(searchVal) => this.setState({searchVal})}
  //         value={this.state.searchVal}/>
  //     </View>
  //   )
  // }

  _goBackFun=()=>{
    this.props.navigation.goBack();
  }

  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {};
  //   return {
  //     title: 'Popular',
  //     headerLeft:(
  //       <TouchableOpacity style={{paddingLeft:20}} onPress={params.goBackFun}>
  //         <Ionicons name="md-arrow-back" size={24} color="#fff" />
  //       </TouchableOpacity>
  //     ),
  //     headerTitle: params.renderHeaderTitle,      
  //     headerRight: (
  //       <TouchableOpacity style={{paddingRight:20}} onPress={params.goSearch}>
  //         <Ionicons name="md-search" size={24} color="#fff" />
  //       </TouchableOpacity>
  //     ),
  //     headerStyle: {
  //       backgroundColor: '#6570e2',
  //       borderBottomColor: 'transparent',
  //       borderWidth: 0,
  //       elevation: 0,
  //       shadowOpacity: 0,
  //       height: 56
  //     }
  //   };
  // };
  goSearch=()=>{ 
    if(this.state.rightIconName==='md-search'){
      this.setState({
        rightIconName: 'md-close'
      })
      this.loadData();
    }else{
      this.setState({
        rightIconName: 'md-search'
      })
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
  loadData(){
    fetch(this.getFetchUrl(this.state.searchVal)).then(response=>response.json()).then(responseData =>{
      if(!this||!responseData||!responseData.items||responseData.items.length ===0 ){
        Alert.alert('什么都没有找到')
        this.setState({
          rightIconName:'md-search'
        })
        return;
      }
      Alert.alert('url is' + this.getFetchUrl(this.state.searchVal))
      this.items = responseData.items;
      this.getFavoriteKeys();
    }).catch(e=>{
      this.setState({
        rightIconName:'md-search'
      })
    })
  }

  getFetchUrl(key){
    return API_URL + key + QUERY_STR;
  }
  onSelect(item){
    this.props.navigation.navigate('Detail',{itemVal: item, flag:FLAG_STORAGE.flag_popular})
  }
  _onFavorite(item,isFavorite){
    if(isFavorite){
      this.FavoriteUtil.saveFavoriteItem(item.id.toString(),JSON.stringify(item))
    }else{
      this.FavoriteUtil.removeFavoriteItem(item.id.toString());
    }
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
  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <TouchableOpacity style={styles.headerLeft} onPress={this._goBackFun}>
            <Ionicons name="md-arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.textInputWrap}>
            <TextInput
              placeholder='search'
              style={styles.textInput}
              underlineColorAndroid = 'transparent'
              onChangeText={(searchVal) => this.setState({searchVal})}
              value={this.state.searchVal}/>
          </View>
          <TouchableOpacity style={styles.headerRight} onPress={this.goSearch}>
            <Ionicons name={this.state.rightIconName} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.listBox}>
          <FlatList
            data={this.state.dataArr}
            keyExtractor = {(item, index) => item.id}
            onRefresh={this._onRefresh}
            refreshing={false}
            renderItem={({item}) => <RepositoriesCell dataItem={item} 
            onSelect={this.onSelect.bind(this,item)}
            onFavorite={(item,isFavorite)=>this._onFavorite(item,isFavorite)}/>
            }
          />  

        </View>
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  textInputWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex:1
  },
  textInput: {
    height: 40,
    width:250,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    color: '#fff',
    fontSize: 16,
    backgroundColor:'transparent',
  },
  headerBox: {
    height: 56,
    backgroundColor: '#6570e2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft:{
    width: 40,
    paddingLeft:20,
  },
  headerRight: {
    width: 40
  }
})
