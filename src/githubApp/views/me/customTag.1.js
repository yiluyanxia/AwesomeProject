import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity,ScrollView,Image, Alert,AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguageUtil,{FLAG_LANGUAGE} from '../../util/LanguageUtil'
import CheckBox from 'react-native-check-box'
import ArrayUtil from '../../util/ArrayUtil'
class CustomTag extends Component {
  constructor(props){
    super(props);
    this.LanguageUtil = new LanguageUtil(FLAG_LANGUAGE.flag_key);
    this.changeValue = [];
    this.isRemoveKey = this.props.navigation.state.params.isRemove ?true:false
    this.state={
      dataArr:[],
      storageKey:''
    }
  }
  

  _loadData(){
    this.LanguageUtil.fetch().then(result => {
      this.setState({
        dataArr:result
      })
    }).catch(error => {
      console.log(error);
    })
  }
  _onSave= ()=>{
    if(this.changeValue.length===0){
      this.props.navigation.goBack(null);
      return;
    }
    this.LanguageUtil.save(this.state.dataArr);
    this.props.navigation.goBack(null);
  }
  _goBackFun=()=>{
    if(this.changeValue.length===0){
      this.props.navigation.goBack(null);
      return;
    }
    Alert.alert(
      '',
      'Discard your changes?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Discard', onPress: () => { this.props.navigation.goBack(null);}},
      ],
      { cancelable: false }
    )
  }
  static navigationOptions = ({ navigation }) => {
  
    const params = navigation.state.params || {};
    let _title = this.isRemoveKey ? 'Remove Tag' : 'Custom Tag';
    return {
      title: _title,
      headerLeft:(
        <TouchableOpacity style={{paddingLeft:20}} onPress={params.goBackFun}>
          <Ionicons name="md-arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={{paddingRight:20}} onPress={params.onSave}>
          <Ionicons name="md-checkmark" size={24} color="#fff" />
        </TouchableOpacity>
      )
    };
  };

  

  // static navigationOptions = {
  //   title: 'RN practice',
  // };
  componentWillMount() {
    this.props.navigation.setParams({ onSave: this._onSave });
    this.props.navigation.setParams({ goBackFun: this._goBackFun });
    this._loadData();
  }

  _renderView(){

    if(!this.state.dataArr || this.state.dataArr.length===0)return;
    const views =[]
    for(let i = 0;i < this.state.dataArr.length; i++){
      views.push(
        
        <View key={i}>
          {/* <Ionicons name="logo-javascript" size={24} color="#455A64" /> */}
          {/* <Text style={styles.tag_txt}>{this.state.dataArr[i].name}</Text> */}
          {this._renderCheckBox(this.state.dataArr[i])}
        </View>
        
      )
    }
    return views;
       
  }
  onClick(data) {
    data.checked=!data.checked;
    ArrayUtil.updateArray(this.changeValue,data);
  }

  _renderCheckBox(data){
    let leftText = data.name;
    let isChecked = this.isRemoveKey ? false : data.checked;
    return (
      <CheckBox 
        style={{flex:1,padding:10}}
        onClick={()=>this.onClick(data)}
        leftText={leftText}
        isChecked={isChecked}
        checkedImage={
          <Image
            tintColor="#6570e2"
            style={{width:28, height:28}}
            source={require('../../assets/images/ic_check_box.png')}
          />
        }
        unCheckedImage={
          <Image
            tintColor="#6570e2"
            style={{width:28, height:28}}
            source={require('../../assets/images/ic_check_box_outline.png')}
          />
        }
      />
    )
  }



  clearStorage(){
    // AsyncStorage.removeItem()
    // AsyncStorage.getAllKeys((err,keys)=>{
    //   if (err) {
    //       //TODO:存储取数据出错 ，给用户提示错误信息。
    //   }
    //   //将存储的商品条数反应到按钮上
    //   this.setState({
    //     storageKey:keys
    //   });
    // });

    AsyncStorage.removeItem('flag_language_key',(error)=>{
      if(error){
        return;
      }
    })
  }
  // removeItem(key: string, [callback]: ?(error: ?Error) => void)

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.scrollView}>
            {this._renderView()}
          </View>
          {/* <View>
            <Text>{JSON.stringify(this.state.dataArr)}</Text>
            <Text>{JSON.stringify(this.state.storageKey)}</Text>
            <Text onPress={()=>{this.clearStorage()}}>清出</Text>
          </View> */}
         <Text>this.isRemoveKey {JSON.stringify(this.isRemoveKey)}</Text>
        </ScrollView>
     </View>
    );
  }
}

export default CustomTag;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#fff",
  },
  scrollView:{
    justifyContent: 'center',
    padding:10,
  },
  tag: {
    width:100,
    height:80,
    alignContent: 'center',
    alignItems: 'center',
  },
  tag_txt:{
    textAlign: 'center'
  }

})
