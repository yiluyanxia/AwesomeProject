import React, { Component } from 'react';
import { StyleSheet,View, FlatList,Alert,Text,TouchableOpacity,TouchableHighlight,DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import TrendingCell from '../components/trendingCell'
import LanguageUtil,{FLAG_LANGUAGE} from '../util/LanguageUtil'
import ModalDropdown from 'react-native-modal-dropdown';

import FavoriteUtil from '../util/FavoriteUtil'
import ProjectModel from '../util/projectModel';
import Utils from '../util/utils';

const TRENDING_OPTIONS = ['Today', 'This week', 'This month'];
const TimeSpanArray = ['since=daily','since=weekly','since=monthly']
const API_URL = "https://github.com/trending/"

class Trending extends Component {
  constructor(props){
    super(props);
    this.LanguageUtil = new LanguageUtil(FLAG_LANGUAGE.flag_language);
    this.state={
      languages:[],
      timeSpan: TimeSpanArray[0],
    }
  }
  
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

  componentWillMount() {
    this.props.navigation.setParams({ onSelect: this._onSelect });
  }

  componentDidMount(){
    this._loadData();
  }

  componentWillReceiveProps(){
    this._loadData();
  }
  _onSelect=(idx, value)=>{
      this.setState({
        timeSpan: TimeSpanArray[idx],
      })
    // if(idx==0){
    //   this.setState({
    //     timeSpan: TimeSpanArray[0],
    //   })
    // }
    // if(idx==1){
    //   this.setState({
    //     timeSpan: TimeSpanArray[1],
    //   })
    // }
    // if(idx==2){
    //   this.setState({
    //     timeSpan: TimeSpanArray[2],
    //   })
    // }
  }
  static navigationOptions = ({ navigation }) => {
  
    const params = navigation.state.params || {};
    return {
      headerTitle:(
        <View style={styles.dropdownView}>
          <ModalDropdown 
            style={styles.dropdown}
            textStyle={styles.dropdown_text}
            dropdownStyle={styles.dropdown_list}
            dropdownTextStyle={styles.dropdown_option}
            dropdownTextHighlightStyle={styles.dropdown_highligh}
            options={TRENDING_OPTIONS}
            defaultValue={TRENDING_OPTIONS[0]}
            onSelect={params.onSelect}
          >
          </ModalDropdown>
        </View>
      ),
      
    };
  };
  
  render() {
    let content = this.state.languages.length>0?
    <ScrollableTabView
        tabBarBackgroundColor="#6570e2"
        tabBarActiveTextColor="#fff"
        tabBarInactiveTextColor="#fefefe"
        tabBarUnderlineStyle={{backgroundColor:"#fff"}}
      >
        {this.state.languages.map((result,i,arr)=>{
          let lan = arr[i];
          return lan.checked? <TrendingTab key={i} tabLabel={lan.name} timeSpan={this.state.timeSpan} {...this.props}></TrendingTab>: null
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

class TrendingTab extends Component{
  constructor(){
    super();
    this.DataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
    this.FavoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_trending)
    this.state = {
      result:'',
      dataArr:[],
      favoriteKeys:[]
    }
  }
  componentDidMount(){
    this.onLoad(this.props.timeSpan);
    this.listener= DeviceEventEmitter.addListener('favoriteChange_trending',()=>{
      this.isFavoriteChanged = true;
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.timeSpan!==this.props.timeSpan){
      this.onLoad(nextProps.timeSpan)
    }else if(this.isFavoriteChanged){
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

  
  getFetchUrl(timeSpan,category){
    return API_URL + category + '?' + timeSpan;
  }

  onLoad(timeSpan){
    // let url = URL+this.props.tabLabel+QUERY_STR; 
    // let url = this.getFetchUrl('?since=daily',this.props.tabLabel); 
    let url = this.getFetchUrl(timeSpan,this.props.tabLabel); 
    this.DataRepository.fetchRepository(url).then(result => {
      this.items =result&&result.items?result.items:result?result:[];
      // this.setState({dataArr: items});
      this.getFavoriteKeys();
      if(result&&result.update_date&&!this.DataRepository.checkData(result.update_date)){
        // Alert.alert('数据过期')
        return this.DataRepository.fetchNetRepository(url);
      }else{
        // Alert.alert('显示缓存数据')
      }
    }).then(items=>{
      if(!items || items.length===0)return;
      this.items = items;
      this.getFavoriteKeys();
      // this.setState({
      //   dataArr: items
      // })
      // Alert.alert('显示网络数据')
    })
    .catch(error=>{
      console.log(error)
    })
  }

  onLoadByHand(timeSpan){
    let url = this.getFetchUrl(timeSpan,this.props.tabLabel);
    this.DataRepository.fetchNetRepository(url).then(result => {
      // this.setState({dataArr: result});
      // Alert.alert('手动刷新网络数据')
      this.items = result;

      this.getFavoriteKeys();

    }).catch(error=>{
      console.log(error)
    })
  }
  _onRefresh = () =>{
    this.onLoadByHand(this.props.timeSpan)
  }
 
  onSelect(item){
    this.props.navigation.navigate('Detail',{itemVal: item,flag:FLAG_STORAGE.flag_trending})
  }
  _onFavorite(item,isFavorite){
    if(isFavorite){
      this.FavoriteUtil.saveFavoriteItem(item.fullName.toString(),JSON.stringify(item))
    }else{
      this.FavoriteUtil.removeFavoriteItem(item.fullName.toString());
    }

  }
  render(){
    return(
      <FlatList
        data={this.state.dataArr}
        keyExtractor = {(item, index) => item.id}
        onRefresh={this._onRefresh}
        refreshing={false}
        renderItem={({item}) => <TrendingCell dataItem={item} 
        onSelect={this.onSelect.bind(this,item)}
        onFavorite={(item,isFavorite)=>this._onFavorite(item,isFavorite)}
        // onSelect={(item)=>this.onSelect(item)}
      />
      }
      />     

    )
  }
}


export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  dropdownView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
  },
  dropdown: {
    width: 120,
  },
  dropdown_text:{
    color:'#fff',
    fontSize:20,
    fontWeight: 'bold',
    textAlign:'center',
  },
  dropdown_list:{
    width: 120,
    height: 152,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdown_option:{
    height:50,
    textAlign:'center',
    fontSize:18,
    color:'#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0,
  },
  dropdown_highligh:{
    color:'#fff',
  }
})
