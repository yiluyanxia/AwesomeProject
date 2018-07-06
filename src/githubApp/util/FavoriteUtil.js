import {AsyncStorage } from 'react-native'

// export var FLAG_LANGUAGE = {
//   flag_language: 'flag_language_language',
//   flag_key: 'flag_language_key'
// }
const FAVORITE_KEY_PREFIX = 'favorite_';
export default class FavoriteUtil {
  constructor(flag) {
    this.flag = flag;
    this.favoriteKey = FAVORITE_KEY_PREFIX+flag;
  }
  
  saveFavoriteItem(key,value,callback){
    AsyncStorage.setItem(key, value,(error) =>{
      if(!error){
        this.updateFavoriteKeys(key,true);
      }
    })
  }
  

  updateFavoriteKeys(key,isAdd){
    AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
      if(!error){
        var favoriteKeyArr =[];
        if(result){
          favoriteKeyArr = JSON.parse(result);
        }
        var index =favoriteKeyArr.indexOf(key);
        if(isAdd){
          if(index === -1)favoriteKeyArr.push(key)
        }else{
          if(index!==-1)favoriteKeyArr.splice(index,1)
        }
        AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeyArr))
      }
    })
  }

  getFavoriteKeys(){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
        if(!error){
          try{
            resolve(JSON.parse(result));
          }catch(e){
            reject(e);
          }
        }else{
          reject(error);
        }
      })
    })
  }

  removeFavoriteItem(key){
    AsyncStorage.removeItem(key,(error,result)=>{
      if(!error){
        this.updateFavoriteKeys(key,false)
      }
    })
  }

  getAllItem(){
    return new Promise((resolve,reject) => {
      this.getFavoriteKeys().then(keys=>{
        var items =[];
        if(keys){
          AsyncStorage.multiGet(keys,(err,stores)=>{
            try{
              stores.map((result,i,store)=>{
                let value  =store[i][1];
                if(value)items.push(JSON.parse(value));
              })
              resolve(items);
            }catch(e){
              reject(e);
            }
          })
        }else{
          resolve(items);
        }
      }).catch((e)=>{
        reject(e);
      })
    })
  }

}