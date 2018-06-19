import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GitHubTrending from 'GitHubTrending'
import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'

const URL = 'https://github.com/trending/'


class Trending extends Component {
  constructor(props){
    super(props);
    this.GitHubTrending =new GitHubTrending();
    this.DataRepository = new DataRepository(FLAG_STORAGE.flag_trending)
    this.state={
      result:[]
    }
  }
  onLoad() {
    let url = URL + this.text;
    this.DataRepository.fetchNetRepository(url).then(result=>{  
      this.setState({
        result:JSON.stringify(result)
      })
    }).catch(error=>{
      this.setState({
        result:JSON.stringify(error)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>this is Trending</Text>
        <TextInput style={{height:40}} onChangeText={(text)=>{this.text=text}}/>
        <Text onPress={()=>this.onLoad()}>loading</Text>
        <Text>{this.state.result}</Text>
      </View>
    );
  }
}

export default Trending;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  }
})
