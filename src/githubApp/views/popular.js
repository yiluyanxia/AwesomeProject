import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataRepository from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoriesCell from '../components/repositoriesCell'
import LanguageUtil,{FLAG_LANGUAGE} from '../util/LanguageUtil'

const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR ="&sort=star"

class Popular extends Component {
  static navigationOptions = {
    headerTitle: 'RN practice',
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
          return lan.checked? <PopularTab key={i} tabLabel={lan.name}></PopularTab>: null
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
    this.dataRepository = new DataRepository();
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
    this.dataRepository.fetchNetRepository(url).then(result => {
      this.setState({dataArr: result.items})
    }).catch(error=>{
      console.log(error)
    })
  }
  _onRefresh = () =>{

  }
  render(){
    return(
      <FlatList
        data={this.state.dataArr}
        keyExtractor = {(item, index) => item.id}
        onRefresh={this._onRefresh}
        refreshing={false}
        renderItem={({item}) => <RepositoriesCell dataItem={item} />}
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
