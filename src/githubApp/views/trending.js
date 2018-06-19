import React, { Component } from 'react';
import { StyleSheet,View, FlatList,Alert,Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import TrendingCell from '../components/trendingCell'
import LanguageUtil,{FLAG_LANGUAGE} from '../util/LanguageUtil'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const API_URL = "https://github.com/trending/"

class Trending extends Component {

  static navigationOptions = ({ navigation }) => {
  
    const params = navigation.state.params || {};
    return {
      headerTitle: 'Trending'
      
      // headerTitle:(
        // <Menu>
        //   <MenuTrigger text='Select action' />
        //   <MenuOptions>
        //     <MenuOption onSelect={() => alert(`Save`)} text='Save' />
        //     <MenuOption onSelect={() => alert(`Delete`)} >
        //       <Text style={{color: 'red'}}>Delete</Text>
        //     </MenuOption>
        //     <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
        //   </MenuOptions>
        // </Menu>
      // ),
      // headerLeft:(
      //   <TouchableOpacity style={{paddingLeft:20}} onPress={params.goBackFun}>
      //     <Ionicons name="md-arrow-back" size={24} color="#fff" />
      //   </TouchableOpacity>
      // ),
      // headerRight: (
      //   <TouchableOpacity style={{paddingRight:20}} onPress={params.onSave}>
      //     <Ionicons name="md-checkmark" size={24} color="#fff" />
      //   </TouchableOpacity>
      // )
    };
  };

  
  constructor(props){
    super(props);
    this.LanguageUtil = new LanguageUtil(FLAG_LANGUAGE.flag_language);
    this.state={
      languages:[]
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
  componentDidMount(){
    this._loadData();
  }
  componentWillReceiveProps(){
    this._loadData();
    
  }

  
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
          return lan.checked? <TrendingTab key={i} tabLabel={lan.name} {...this.props}></TrendingTab>: null
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
    this.state = {
      result:'',
      dataArr:[]
    }
  }
  componentDidMount(){
    this.onLoad();
  }
  
  getFetchUrl(timeTag,category){
    return API_URL + category + timeTag.searchText;
  }

  onLoad(){
    // let url = URL+this.props.tabLabel+QUERY_STR; 
    let url = this.getFetchUrl('?since=daily',this.props.tabLabel); 
    this.DataRepository.fetchRepository(url).then(result => {
      let items =result&&result.items?result.items:result?result:[];
      this.setState({dataArr: items});
      if(result&&result.update_date&&!this.DataRepository.checkData(result.update_date)){
        // Alert.alert('数据过期')
        return this.DataRepository.fetchNetRepository(url);
      }else{
        // Alert.alert('显示缓存数据')
      }
    }).then(items=>{
      if(!items || items.length===0)return;
      this.setState({
        dataArr: items
      })
      // Alert.alert('显示网络数据')
    })
    .catch(error=>{
      console.log(error)
    })
  }

  onLoadByHand(){
    let url = this.getFetchUrl('?since=daily',this.props.tabLabel);
    this.DataRepository.fetchNetRepository(url).then(result => {
      this.setState({dataArr: result});
      // Alert.alert('手动刷新网络数据')

    }).catch(error=>{
      console.log(error)
    })
  }
  _onRefresh = () =>{
    this.onLoadByHand()
  }
 
  onSelect(item){
    this.props.navigation.navigate('Detail',{itemVal: item})
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
  }
})
