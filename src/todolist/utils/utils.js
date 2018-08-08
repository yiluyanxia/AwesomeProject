import {AsyncStorage } from 'react-native'
export default class Utils {
  static filterArr(dataArr) {
    var list = dataArr, data = [];
    for (var i = 0; i < list.length; i++) {
      if (!data[list[i].isComplete]) {
        var arr = [];
        arr.push(list[i]);
        data[list[i].isComplete] = arr;
      } else {
        data[list[i].isComplete].push(list[i])
      }
    }
    return data;
  }
  static uniqueId(){
    let a=Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
  }

  static _checkTodo(item, todolistData){
    for(let i = 0 , len = todolistData.length; i<len; i++){
      if(item.id === todolistData[i].id){
        todolistData[i].isComplete = !todolistData[i].isComplete 
      }
    }
    AsyncStorage.setItem('todolistData', JSON.stringify(todolistData), ()=>{
    });
  }

  static _deleteTodo(item, todolistData){
    for(let i = todolistData.length-1; i>=0; i-- ){
      if(item.id === todolistData[i].id){
        todolistData.splice(i, 1)
        AsyncStorage.setItem('todolistData', JSON.stringify(todolistData), ()=>{
        });
      }
    }
  }

}
