import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 Switch,
 Button,
 FlatList,
 Alert,
 TouchableOpacity,
 AsyncStorage,
} from 'react-native';
import TodoItem from './todoItem'
import Ionicons from 'react-native-vector-icons/Ionicons';


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
    this._getTodolistData();

  }

  componentWillReceiveProps(){
    this._getTodolistData();
  }
  
  _getTodolistData(){
    let _this = this;
    AsyncStorage.getItem('todolistData', (err, result) => {
      if(err){
        return;
      }
      let todoListArr = (result != null) ? JSON.parse(result) :[]
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
      // Alert.alert("savemerge success");
      // AsyncStorage.mergeItem('todolistData',JSON.stringify(mergeVal), () =>{
        
      // })
    });
    //为什么只写mergeItem存不进去？
    // AsyncStorage.mergeItem('todolistData',JSON.stringify(mergeVal), () =>{
    //   Alert.alert("merge3 success")
    // })
  }

  // _navigationAdd(){
  //   this.props.navigation.navigate('Add');
  // }

  _navigationAdd = () => {
    this.props.navigation.navigate('Add');
  };


  
  _remove =()=>{
    Alert.alert("remove")
    
    AsyncStorage.removeItem('todolistData', () => {
      Alert.alert("remove success")
      
    });
  }

  render() {
    let todoList = this.state.todolistData
    return (
      <View style={styles.wrapper}>
        <Button onPress={this._remove} title="remove" />
        <FlatList
          data={todoList}
          keyExtractor = {(item, index) => item.id.toString()}
          renderItem={({item,index}) => <TodoItem content={item.content} isComplete={item.isComplete} _merge={this._merge.bind(this,index)} /> }
        />

        <TouchableOpacity style={styles.addBtn} onPress={this._navigationAdd}>
          <Ionicons name="md-add" size={38} color="#fff" />
      
        </TouchableOpacity>
        
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
  },
  addBtn:{
    position: "relative",
    left: 10,
    bottom: 10,
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#448AFF",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }

})
