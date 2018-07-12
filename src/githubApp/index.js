import React,{Component} from 'react';
import { DeviceEventEmitter } from 'react-native';
import BaseRouter, { AppStack }  from './router';
import ThemeUtil from './network/ThemeUtil';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      theme:{}
    }
  }
  componentDidMount(){
    new ThemeUtil().getTheme().then(data=>{
      this.setState({
        theme:data
      })
    })

    this.appListener = DeviceEventEmitter.addListener('theme_change',(params) => {
      this.onThemeChange(params)
    })

  }

  componentWillUnmount(){
    if(this.appListener){
      this.appListener.remove();
    }
  }

  onThemeChange(theme){
    if(!theme) return;
    this.setState({
      theme:theme
    })
  }
  render(){
    return (
      <AppStack screenProps={this.state.theme} />
    )
  }
}
