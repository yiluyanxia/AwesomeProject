import React, { Component } from 'react';
import { StyleSheet,View, FlatList,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoriesCell from '../components/repositoriesCell'
import LanguageUtil,{FLAG_LANGUAGE} from '../util/LanguageUtil'

const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR ="&sort=star"

class Popular extends Component {

  static navigationOptions = {
    title: 'Popular',
  };
  
  constructor(props){
    super(props);
    this.LanguageUtil = new LanguageUtil(FLAG_LANGUAGE.flag_key);
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
    this.state = {
      result:'',
      dataArr:[]
    }
  }
  componentDidMount(){
    this.onLoad();
  }
  

  onLoad(){
    let url = URL+this.props.tabLabel+QUERY_STR; 
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
    let url = URL+this.props.tabLabel+QUERY_STR; 
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
        renderItem={({item}) => <RepositoriesCell dataItem={item} 
        onSelect={this.onSelect.bind(this,item)}
        // onSelect={(item)=>this.onSelect(item)}
      />
      }
      />     

    )
  }
}


export default Popular;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  }
})
