import {AsyncStorage } from 'react-native'

export default class DataRepository{
  fetchRepository(url){
    return new Promise((resolve,reject)=>{
      //获取本地数据
      this.fetchLoaclRepository(url).then(result=>{
        if(result){
          resolve(result,true);
        } else{
          this.fetchNetRepository(url).then((data)=>{
            resolve(data);
          }).catch((error)=>{
            reject(error);
          })
        }
      }).catch((error)=>{
        console.log('fetchLoaclRepository fail' + error);
        this.fetchNetRepository(url).then((data)=>{
          resolve(data);
        }).catch((error)=>{
          reject(error)
        })
      })
    })
  }
  fetchLoaclRepository(url){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(url,(error,result)=>{
        if(!error){
          try{
            resolve(JSON.parse(result));
          }catch(e){
            reject(e);
          }
        }else{
          reject(error)
        }
      })
    })
  }
  fetchNetRepository(url){
    return new Promise((resolve, reject)=>{
      fetch(url).then(response => response.json())
      .then(result => {
        if(!result){
          reject(new Error('responseData is null'));
          return;
        }
        resolve(result.items);
        this.saveRepository(url,result.items)
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  saveRepository(url,items,callback){
    if(!url||!items)return;
    let wrapData={
      item:items,updata_data:new Data().getTime()
    };
    AsyncStorage.setItem(url,JSON.stringify(wrapData),callback);
  }

  checkData(longTime){
    let cDate = new Date()
    let tDate = new Date()
    tDate.setTime(longTime);
    if(cDate.getMonth()!==tDate.getMonth())return false;
    if(cDate.getDay()!==tDate.getDay())return false;
    if(cDate.getHours() - tDate.getHours()>4)return false;
    return true;
  }
 
}