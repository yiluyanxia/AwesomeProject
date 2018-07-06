import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,WebView,Alert,Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DataRepository,{FLAG_STORAGE} from '../network/DataRepository'
import FavoriteUtil from '../util/FavoriteUtil'

var WEBVIEW_REF = 'webview';
const TRENDING_URL ='https://github.com/'
class Detail extends Component {

  constructor(props){
    super(props);
    const navParams=this.props.navigation.state.params||{}
    // let url = this.props.navigation.state.params.itemVal.html_url?this.props.navigation.state.params.itemVal.html_url: TRENDING_URL+this.props.navigation.state.params.itemVal.fullName;
    let url = navParams.itemVal.item.html_url?navParams.itemVal.item.html_url: TRENDING_URL+navParams.itemVal.item.fullName;

    this.FavoriteUtil = new FavoriteUtil(navParams.flag)
    // this.FavoriteUtil = new FavoriteUtil(FLAG_STORAGE.flag_popular)

    this.state ={
      url: url,
      canGoBack:false,      
      // favoriteIconName:navParams.itemVal.isFavorite?'md-heart':'md-heart-outline'
    }

  }


  

  componentWillMount(){
    
  }

  componentDidMount(){
    this.props.navigation.setParams({ goBackFun: this._goBackFun });
    this.props.navigation.setParams({ isF:this.props.navigation.state.params.itemVal.isFavorite});
    this.props.navigation.setParams({ onFavorite:this._onFavorite});
  }



  static navigationOptions = ({ navigation }) => {
    
    const params = navigation.state.params || {};
    const favoriteIconName= params.itemVal.isFavorite?'md-heart':'md-heart-outline';   
    const _title = params.itemVal.item.full_name?params.itemVal.item.full_name:params.itemVal.item.fullName;
    return {
      title: _title,

      headerLeft:(
        <TouchableOpacity style={{paddingLeft:20}} onPress={params.goBackFun}>
          <Ionicons name="md-arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
    
      ),
      headerRight: (
        <TouchableOpacity style={{paddingRight:20}} onPress={()=>{navigation.setParams({isF: params.isF=!params.isF}); params.onFavorite()}}>
          <Ionicons name={params.isF===true?'md-heart':'md-heart-outline'} size={24} color="#fff" />
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

  setFavoriteState(isFavorite){
    this.props.navigation.state.params.itemVal.isFavorite = isFavorite
  }

  _onFavorite=()=>{
    var itemVal = this.props.navigation.state.params.itemVal 
    var isFavorite = !itemVal.isFavorite; 
    var key = itemVal.item.fullName ? itemVal.item.fullName : itemVal.item.id.toString();
  
    if(isFavorite){
      this.FavoriteUtil.saveFavoriteItem(key,JSON.stringify(itemVal.item))
      // Alert.alert('_onF2')

    }else{
      this.FavoriteUtil.removeFavoriteItem(key);
      // Alert.alert('_onF3')
    }
  }

 
  
  _onNavigationStateChange =(navState)=>{
    this.setState({
      canGoBack:navState.canGoBack,
      // url:navState.url
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

export default Detail;

const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
})

