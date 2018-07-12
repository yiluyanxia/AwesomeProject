import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ViewPagerAndroid } from 'react-native';
import ThemeUtil from '../network/ThemeUtil';

class Wellcome extends Component {

  constructor(){
    super();
    this.state = {
      page: 0,
    }
  }
  componentDidMount(){
    
  }
  _onPageSelected(e) {
    this.setState({page: e.nativeEvent.position});
  }

  render() {
    return (
     <View style={styles.container}>
      <ViewPagerAndroid
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={this._onPageSelected.bind(this)}
          ref={viewPager => { this.viewPager = viewPager; }}
        >
        <View style={styles.page} key="0">
          <Image style={styles.bg} 
          source={require('../assets/images/bg.jpg')}
          />
          <Text style={styles.txt}>This is a github APP from a beginner. And this is from teacher feng.</Text>
        </View>
        <View style={styles.page} key="1">
          <Image style={styles.bg} 
            source={require('../assets/images/bg2.jpg')}
          />
          <Text style={styles.txt2}
            onPress={()=>{this.props.navigation.navigate('Popular')}}
          >
            Getting Started
          </Text>
          
          
        </View>
      </ViewPagerAndroid>
      <View style={styles.dotView}>
        <Text 
          style={[styles.dot,this.state.page == 0 ?styles.dotOn:'']}
          onPress={()=>this.viewPager.setPage(0)}
          >0</Text>
        <Text 
          style={[styles.dot,this.state.page == 1 ?styles.dotOn:'']}
          onPress={()=>this.viewPager.setPage(1)}>1</Text>
      </View>
      
     </View>
    );
  }
}



export default Wellcome;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: "#efefef",
  },
  bg:{
    flex:1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center'
  },
  viewPager: {
    flex: 1
  },
  page: {
    alignItems: 'center',
  },
  txt:{
    position: "absolute",
    color: "#fff",
    top:90,
    fontSize: 30,
    paddingTop: 60,
    paddingLeft: 40,
    paddingRight: 40,
  },
  txt2:{
    position: "absolute",
    color: "#fff",
    top:200,
    fontSize: 30,
  },
  dotView:{
    position: "absolute",
    bottom: 30,
    left:0,
    right:0,
    alignContent:'center',
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot:{
    fontSize:0,
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#24292e',
    margin: 12,
  },
  dotOn:{
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#24292e',
  }

})
