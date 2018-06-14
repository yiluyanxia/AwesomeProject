import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity,TouchableHighlight,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SortableListView from 'react-native-sortable-listview';
import LanguageUtil,{FLAG_LANGUAGE} from '../../util/LanguageUtil'
import ArrayUtil from '../../util/ArrayUtil'

class SortRow extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.sort}
        {...this.props.sortHandlers}
      >
        <View style={styles.sort_row}>
          <Icon name="reorder" size={22} color="#6570e2" />
          <Text style={styles.sort_name}>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class SortTag extends Component {
  constructor(props){
    super(props);
    
    this.dataArr=[]; //数据库中的数组
    this.sortArr=[]; //排序后的数组
    this.originalCheckedArr=[]; //原来被选中的的数组
    this.state={
      checkedArr:[]
    }
  }
  componentDidMount(){
    this.LanguageUtil = new LanguageUtil(FLAG_LANGUAGE.flag_key);
    this.props.navigation.setParams({ onSave: this._onSave });
    this.props.navigation.setParams({ goBackFun: this._goBackFun });
    this._loadData();
  }

  _loadData(){
    this.LanguageUtil.fetch().then((result) => {
      this.getCheckedItems(result);
    }).catch(error => {
      console.log(error);
    })
  }
  getCheckedItems(result){
    this.dataArr=result;
    let checkedArr=[];
    for(let i=0,len=result.length;i<len; i++){
      let data = result[i];
      if(data.checked)checkedArr.push(data);
    }
    this.setState({
      checkedArr:checkedArr
    })
    this.originalCheckedArr = ArrayUtil.cloneArray(checkedArr)
  }


  _onSave= ()=>{
    if(ArrayUtil.isEqual(this.originalCheckedArr,this.state.checkedArr)){
      this.props.navigation.goBack(null);
      return;
    }
    this.getSortResult();
    this.LanguageUtil.save(this.sortArr);

  }
  getSortResult(){
    this.sortArr =ArrayUtil.cloneArray(this.dataArr)
    for(let i =0,l=this.originalCheckedArr.length;i<l;i++){
      let item = this.originalCheckedArr[i];
      let index = this.dataArr.indexOf(item);
      this.sortArr.splice(index,1,this.state.checkedArr[i]);
    }
  }

  _goBackFun=()=>{
    if(!ArrayUtil.isEqual(this.originalCheckedArr,this.state.checkedArr)){
      this.props.navigation.goBack(null);
      return;
    }
    Alert.alert(
      '',
      'Discard your reorder?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Discard', onPress: () => { this.props.navigation.goBack(null);}},
      ],
      { cancelable: false }
    )
  }


  static navigationOptions = ({ navigation }) => {
    
    const params = navigation.state.params || {};
    return {
      headerLeft:(
        <TouchableOpacity style={{paddingLeft:20}} onPress={params.goBackFun}>
          <Ionicons name="md-arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
      ),
      headerRight: (
        <TouchableOpacity style={{paddingRight:20}} onPress={params.onSave}>
          <Ionicons name="md-checkmark" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      tabBarVisible: false,
    };
  };
 
  render() {
    return (
      <View style={styles.container}>
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.checkedArr}
          order={Object.keys(this.state.checkedArr)}
          onRowMoved={e => {
            this.state.checkedArr.splice(e.to, 0, this.state.checkedArr.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <SortRow data={row} />}
        />
      </View>
    );
  }
}


export default SortTag;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  },
  sort:{
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
  },
  sort_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sort_name:{
    marginLeft:10,
    fontSize: 18,
  }
  
})
