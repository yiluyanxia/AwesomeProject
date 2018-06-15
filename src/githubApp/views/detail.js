import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,WebView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DataRepository from '../network/DataRepository'


var WEBVIEW_REF = 'webview';

class HomeView extends Component {

  constructor(props){
    super(props);
    let url = this.props.navigation.state.params.itemVal.html_url;
    // let title = this.props.navigation.state.params.item.full_name;
    this.state ={
      url: url,
      // title: title,
      canGoBack:false
    }
  }

  componentDidMount(){
    this.props.navigation.setParams({ goBackFun: this._goBackFun });
  }

  static navigationOptions = ({ navigation }) => {
    
    const params = navigation.state.params || {};
    return {
      title: params.itemVal.full_name,
      headerLeft:(
        <TouchableOpacity style={{paddingLeft:20}} onPress={params.goBackFun}>
          <Ionicons name="md-arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
    
      ),
      headerRight: (
        <TouchableOpacity>
          
        </TouchableOpacity>
      )
    };
  };

 
  _goBackFun =()=>{
    if(this.state.canGoBack){
      this.refs[WEBVIEW_REF].goBack();
    }else{
      this.props.navigation.goBack();
    }
  }

  // _onNavigationStateChange(navState){
  //   this.setState({
  //     canGoBack:navState.canGoBack,
  //     url:navState.url
  //   })
  // }
  _onNavigationStateChange =(navState)=>{
    this.setState({
      canGoBack:navState.canGoBack,
      url:navState.url
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={WEBVIEW_REF}
          source={{uri: this.state.url}}
          startInLoadingState={true}
          onNavigationStateChange={this._onNavigationStateChange}
          // onNavigationStateChange={(e)=>{this._onNavigationStateChange(e)}}

        />
     </View>
    );
  }
}

export default HomeView;

const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
})

