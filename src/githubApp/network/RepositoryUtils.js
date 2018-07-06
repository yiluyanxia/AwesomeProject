import {
  AsyncStorage
} from 'react-native'
import DataRepository,{FLAG_STORAGE} from './DataRepository'
import Utils from '../util/utils'
var itemMap=new Map();
export default class RepositoryUtils{
  constructor(aboutCommon){
    this.aboutCommon = aboutCommon;
    this.DataRepository = new DataRepository(FLAG_STORAGE.flag_me)
  }

  updateData(k,v){
    itemMap.set(k,v);
    var arr=[];
    for(var value of itemMap.values()){
      arr.push(value);
    }
    this.aboutCommon.onNotifyDataChanged(arr);
  }
  fetchRepository(url){
    this.DataRepository.fetchRepository(url).then(result=>{
      if(result){
        this.updateData(url,result);
        if(!Utils.checkData(result.update_data)){
          return this.DataRepository.fetchNetRepository(url);
        }
      }
    }).then(item=>{
            if(item){
              this.updateData(url,item);
            }
          }).catch(e=>{

          })
    }  
  
  fetchRepositories(urls){
    for(let i=0,l=urls.length;i<l;i++){
      var url =urls[i];
      this.fetchRepository(url);
    }
  }
}