import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text,TextInput, View, FlatList,TouchableOpacity,Modal,ScrollView, DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DataRepository from '../../network/DataRepository'
import ThemeFactory, {ThemeFlags} from '../../assets/styles/ThemeFactory'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import ThemeUtil from '../../network/ThemeUtil'
import { NavigationActions } from 'react-navigation'
class CustomTheme extends Component {
  constructor(props){
    super(props);
    this.ThemeUtil = new ThemeUtil()
  }
  
  onSelectTheme(key){
    this.props.onClose();
    this.ThemeUtil.save(ThemeFlags[key])
    
    DeviceEventEmitter.emit('theme_change', ThemeFactory.createTheme(ThemeFlags[key]) ) 

  }
  renderThemeItems(){
    var views = [];
    for(let i = 0,keys=Object.keys(ThemeFlags),l=keys.length;i<l;i++){
      
      views.push(
        <View style={styles.themeItemBox} key={i}>
          <TouchableOpacity style={[{ backgroundColor: ThemeFlags[keys[i]]},styles.themeItem]} onPress={()=>this.onSelectTheme(keys[i])}>
            <Text style={styles.themeItemText}>{keys[i]}</Text>
          </TouchableOpacity>
        </View>)
    }
    return views;
  }

  renderContentView(){
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.onClose()
        }}>
        <View>
          <ScrollView>
            <View style={styles.themeView}>
              {this.renderThemeItems()}
            </View>
            
          </ScrollView>
        </View>
      </Modal>
    )
  }

  render() {
    let view = this.props.modalVisible?
      <View style={styles.container}>
      {this.renderContentView()}
      </View>
      :null
    return view;
  }
}



export default CustomTheme;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  },
  themeView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    
  },
  themeItemBox:{
    width: GlobalStyles.window_width/3,
    height: GlobalStyles.window_width/3,
  },
  themeItem:{
    flex:1,
    margin: 5,
    justifyContent: 'center',
  },
  themeItemText:{
    color: '#fff',
    textAlign: 'center'

  }
  
})

