import React, { Component } from 'react';
import { Alert, DeviceEventEmitter } from 'react-native';
import ThemeUtil from '../network/ThemeUtil';

class BaseComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      theme: {}
    }
  }

  componentDidMount(){
    new ThemeUtil().getTheme().then(data=>{
      this.setState({
        theme: data
      })
    })

    this.baseListener = DeviceEventEmitter.addListener('theme_change',(params) => {
      this.onThemeChange(params)

    })
  }

  componentWillUnmount(){
    if(this.baseListener){
      this.baseListener.remove();
    }
  }
  
  onThemeChange(theme){
    if(!theme) return;
    this.setState({
      theme:theme
    })
  }
  
}

export default BaseComponent;
