import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 Switch,
 Button,
 FlatList,
 Alert,
 AsyncStorage
} from 'react-native';
import TodoItem from './todoItem'


class All extends Component {
  constructor(props){  
    super(props);   
    this.state = {  
      todolistData:[
        {
          id:1,
          content: "哈哈哈哈哈哈",
          isComplete: true
        },
        {
          id:2,
          content: "呵呵呵呵呵呵",
          isComplete: false
        },
        {
          id:3,
          content: "嘿嘿嘿嘿嘿嘿",
          isComplete: false
        }
      ],
      AsyncStorageVal:{
        content: "嘿嘿嘿嘿嘿嘿",
        
      }  
    }  
  }  


  componentDidMount() {
    let _this = this;
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      let todoListArr = (result != null) ? JSON.parse(result) :'';
     
      _this.setState({
        todolistData: todoListArr
      })
      
    })


    

  }


  _save(){
    let _this = this;
    let tdVal =  _this.state.todolistData
    AsyncStorage.setItem('todolistData', JSON.stringify(tdVal), ()=>{
      Alert.alert("save success");
      AsyncStorage.mergeItem('todolistData',JSON.stringify(tdVal), () =>{
        Alert.alert("merge success")
      })
    });
  }
  
  _merge(i){
    let _this = this
    const todolistData = _this.state.todolistData;
    todolistData[i].isComplete = !todolistData[i].isComplete
    _this.setState(preState => ({
      todolistData:[...preState.todolistData]
    }))

    let mergeVal = _this.state.todolistData;
   
    AsyncStorage.setItem('todolistData', JSON.stringify(mergeVal), ()=>{
      Alert.alert("savemerge success");
      AsyncStorage.mergeItem('todolistData',JSON.stringify(mergeVal), () =>{
        
      })
    });
    //为什么只写mergeItem存不进去？
    // AsyncStorage.mergeItem('todolistData',JSON.stringify(mergeVal), () =>{
    //   Alert.alert("merge3 success")
    // })
  }

  getRoutes(){
    const {navigator} = this.props;

    const routes = navigator.getCurrentRoutes();
    const currentRoute = routes[routes.length - 1];

    if (currentRoute.name === "your route name") {
        // reuturn view;
    }
  }


  render() {
    
    return (
      <View style={styles.wrapper}>
        <Button onPress={()=> this._save()} title="click to save"/>
        <FlatList
          data={this.state.todolistData}
          keyExtractor = {(item, index) => item.id.toString()}
          renderItem={({item,index}) => <TodoItem content={item.content} isComplete={item.isComplete} _merge={this._merge.bind(this,index)} /> }
        />
        
      </View>

    )
  }

}

export default All;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  todoitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
  },
  itemtxt:{
    fontSize: 30,
    color: "#000"
    
  },
  itemtxtOff:{
    fontSize: 30,   
    color: "#666"
  }

})
