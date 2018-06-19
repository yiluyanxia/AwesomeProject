import React, {Component}from 'react'
import {AsyncStorage } from 'react-native'
import tags from './tags.json'
import langs from './langs.json'

export var FLAG_LANGUAGE = {
  flag_language: 'flag_language_language',
  flag_key: 'flag_language_key'
}
export default class LanguageUtil {
  constructor(flag) {
    this.flag = flag;
  }

  // fetch(){
  //   return new Promise((resolve, reject)=>{
  //     AsyncStorage.getItem(this.flag, (error, result)=>{
  //       if(error){
  //         reject(error);
  //         return;
  //       }else{
  //         if(result){
  //           try{
  //             resolve(JSON.parse(result));
  //           } catch(e){
  //             reject(e);
  //           }
  //         }else{
  //           var data = this.flag === FLAG_LANGUAGE.flag_key? tags:langs;
  //           this.save(data);
  //           resolve(data)
  //         }
  //       }
  //     })

  //   })
  // }
  fetch(){
    return new Promise((resolve, reject)=>{
      AsyncStorage.getItem(this.flag, (error, result)=>{
        if(error){
          reject(error);
          return;
        }
        if(!result){
          var data = this.flag === FLAG_LANGUAGE.flag_language?langs:tags;
          this.save(data);
          resolve(data);
        }else{
          try{
            resolve(JSON.parse(result));
          } catch(e){
            reject(e)
          }
        }
      });
    });
  }

  save(data){
    AsyncStorage.setItem(this.flag, JSON.stringify(data),(error) =>{
      
    })
  }

}