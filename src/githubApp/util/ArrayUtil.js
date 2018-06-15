export default class ArrayUtil{
  static updateArray(array,item) {
    for(let i=0,len=array.length;i<len;i++){
      let temp =array[i];
      if(temp===item){
        array.slice(i,1);
        return;
      }
    }
    array.push(item);
  }

  static cloneArray(from){
    if(!from)return [];
    let newArr =[];
    for(let i=0,len=from.length;i<len; i++){
      newArr[i]=from[i];
    }
    return newArr;
  }
  
  static isEqual(arr1,arr2){
    if(!(arr1&arr2)) return false;
    if(arr1.length != arr2.length) return false;
    for(let i = 0,l=arr1.length;i<l;i++){
      if(arr1[i] != arr2[i]) return false;
    }
    return true;
  }

  static removeArr(arr,item){
    if(!arr) return;
    for(let i = 0,l=arr.length;i<l;i++){
      if(item===arr[i])arr.splice(i,1);
    }
  }

}