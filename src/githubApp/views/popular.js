import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataRepository from '../network/DataRepository'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoriesCell from '../components/repositoriesCell'


const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR ="&sort=star"

class HomeView extends Component {
  static navigationOptions = {
    title: 'RN practice',
  };

  render() {
    return (
      <View style={styles.container}>

      <ScrollableTabView
        tabBarBackgroundColor="#6570e2"
        tabBarActiveTextColor="#fff"
        tabBarInactiveTextColor="#fefefe"
        tabBarUnderlineStyle={{backgroundColor:"#fff"}}
      >
        <PopularTab tabLabel="Java"></PopularTab>
        <PopularTab tabLabel="React"></PopularTab>
        <PopularTab tabLabel="Vue"></PopularTab>
        <PopularTab tabLabel="IOS"></PopularTab>
      </ScrollableTabView>

      {/* <TextInput 
        style={{height:40,fontSize:30}}
        onChangeText = {text=>this.text=text}
        />
      <Text  
        onPress={()=>this.onLoad()}
        >
        加载
      </Text>
      linear-gradient(-180deg, #6570e2 0%, #3b41af 90%)
      <Text>{JSON.stringify(this.state.result)}</Text> */}
      

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


export default HomeView;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  }
})
