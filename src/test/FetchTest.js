import React, {Component} from 'react'
import { 
  AppRegistry, 
  SectionList, 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  TouchableOpacity 
} from 'react-native';
import HttpUtil from '../network/httpUtil'
class FetchTest extends Component{
  constructor(){
    super();
    this.state = {
      result:''
    }
  }

  onLoad(url){
    
    // fetch(url).then(response => response.json()).then(result => {
    //   this.setState({result: JSON.stringify(result)})
    // }).catch(error => {
    //   this.setState({
    //     result: JSON.stringify(error)
    //   })
    // })
    HttpUtil.get(url).then(result => {
      this.setState({
        result:JSON.stringify(result)
      })
    }).catch(error => {
      this.setState({
        result:JSON.stringify(error)
      })
    })

  }

  onSubmit(url,data){
    // fetch(url,{
    //   method:'POST',
    //   headers:{
    //     'Accept':'application/json',
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then(response => response.json()).then(result => {
    //   this.setState({result: JSON.stringify(result)})
    // }).catch(error => {
    //   this.setState({
    //     result: JSON.stringify(error)
    //   })
    // })
    HttpUtil.post(url,data).then(result=>{
      this.setState({
        result:JSON.stringify(result)
      })
    }).catch(error => {
      this.setState({
        result:JSON.stringify(error)
      })
    })
  }

  render(){
    return(
      <View>
        {/* <Text onPress={()=>this.onLoad("https://cnodejs.org/api/v1/topics?page=1&limit=1&tab=all&mdrender=true")}>请求数据</Text> */}
        <Text onPress={()=>this.onLoad("http://rap2api.taobao.org/app/mock/16361/get/gettest")}>请求数据</Text>
        <Text onPress={()=>this.onSubmit("http://rap2api.taobao.org/app/mock/16361/post/posttest",{foo: "jghh"})}>提交数据</Text>
        <Text>{this.state.result}</Text>
      </View>

    )
  }

}
export default FetchTest;

FetchTest