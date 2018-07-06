import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,WebView, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


var WEBVIEW_REF = 'webview';
class HomeView extends Component {
  constructor(props){
    super(props);
    this.state ={
      canGoBack:false, 
      url:this.props.navigation.state.params.url     
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ goBackFun: this._goBackFun });
  }
  static navigationOptions = ({ navigation }) => {
  
    const params = navigation.state.params || {};
    return {
      title: params.title,
      headerLeft:(
        <TouchableOpacity style={{paddingLeft:20}} onPress={params.goBackFun}>
          <Ionicons name="md-arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={{paddingRight:20}}>
        </TouchableOpacity>
      ),
      headerStyle:{
        backgroundColor: '#6570e2',
        height:56,
      }
    };
  };

  _goBackFun =()=>{
    if(this.state.canGoBack){
      this.refs[WEBVIEW_REF].goBack();
    }else{
      this.props.navigation.goBack();
    }
  }
  _onNavigationStateChange =(navState)=>{
    this.setState({
      canGoBack:navState.canGoBack,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={WEBVIEW_REF}
          source={{uri: this.state.url}}
          startInLoadingState={true}
          onNavigationStateChange={this._onNavigationStateChange}/>
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

