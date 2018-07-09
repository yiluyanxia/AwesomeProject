import React, { Component } from 'react';
import { StyleSheet,View, FlatList,Alert,Text,TouchableOpacity,TouchableHighlight,DeviceEventEmitter } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FLAG_LANGUAGE } from '../util/LanguageUtil';

export const MORE_MENU = {
  Custom_Language:'Custom Language',
  Sort_Language:'Sort Language',
  Custom_Key:'Custom Tag',
  Sort_Key:'Sort Tag',
  Remove_Key:'Remove Tag',
  Custom_Theme:'Custom Theme',
  About:'About',
  About_Author:'About Author',
  Website:'Website',
  Feedback:'Feedback',
}

const menuHeight = 0
class MoreMenu extends Component {
  constructor(props){
    super(props);
    this.state={
    
    }
    menuHeight = this.props.options.length;
  }
  onSelect=(idx, value)=>{
    // Alert.alert('idx value is:'+idx + value)
    let TargetComponent,params={...this.props, menuType:value};
    switch (value) {
      case MORE_MENU.Custom_Language:
        TargetComponent = 'CustomTag';
        params.flag = FLAG_LANGUAGE.flag_language;
        params.isRemove = false;
        break;
      case MORE_MENU.Sort_Language:
        TargetComponent = 'SortTag';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;

      case MORE_MENU.Custom_Key:
        TargetComponent = 'CustomTag';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemove = false;
        break;
      case MORE_MENU.Sort_Key:
        TargetComponent = 'SortTag';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemove = false;
        break;
      case MORE_MENU.Remove_Key:
        TargetComponent = 'CustomTag';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemove = true;
        break;

      case MORE_MENU.Custom_Theme:
        break;
      case MORE_MENU.About:
        TargetComponent = 'AboutApp';
        break;
      case MORE_MENU.About_Author:
        TargetComponent = 'AboutAuthor';
        break;
    }
    if(TargetComponent){
      this.props.onNavigation(TargetComponent,{...params})
     
    }
    
  }

  _renderButtonText(){
    return (
      <Ionicons name="md-more" size={24} color="#fff" />
    )
  }

  renderMoreView(){
    let view = <View style={styles.dropdownView}>
      <ModalDropdown 
        style={styles.dropdown}
        textStyle={styles.dropdown_text}
        dropdownStyle={styles.dropdown_list}
        dropdownTextStyle={styles.dropdown_option}
        dropdownTextHighlightStyle={styles.dropdown_highligh}
        options={this.props.options}
        onSelect={this.onSelect}
        renderButtonText={(rowData) => this._renderButtonText(rowData)}
      >
        <Ionicons style={{paddingRight:20,paddingLeft:10}} name="md-more" size={24} color="#fff" />
      </ModalDropdown>
    </View>
    return view;
  }

  render(){
    return (this.renderMoreView());
  }

}

export default MoreMenu;

const styles = StyleSheet.create({
  dropdownView:{
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent:'center',
  },
  dropdown: {
    // width: 120,
  },
  dropdown_text:{
    color:'#fff',
    fontSize:20,
    fontWeight: 'bold',
    textAlign:'center',
  },
  dropdown_list:{
    // width: 120,
    height: menuHeight * 50 + menuHeight-2,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdown_option:{
    height:50,
    textAlign:'center',
    fontSize:18,
    color:'#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0,
  },
  dropdown_highligh:{
    color:'#fff',
  }
})
