import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 Alert,
 AsyncStorage
} from 'react-native';
// 子组件
class SonComponent extends Component {
  addClick(){
      this.props.receiveNumber()
  }

  render(){
      return (
          <View style={styles.sonViewStyle}>
                  <Text style={{fontSize: 40}} onPress={this.addClick.bind(this)}>{"+"}</Text>
          </View>
      );
  }
}

// 父组件
class FatherComponent extends Component {

  // 构造
  constructor(props) {
      super(props);
      // 初始状态
      this.state = {
          number: 1
      };
  }

  receiveNumber(){
      var m = this.state.number;
      m += 1;
      this.setState({
          number: m
      });
  }

  render(){
      return (
          <View style={styles.container}>
              <SonComponent receiveNumber={this.receiveNumber.bind(this)}/>

              <View style={styles.fatherViewStyle}>
                  <Text style={{fontSize: 20}}>{this.state.number}</Text>
              </View>
          </View>
      );
  }
}

// 主组件
export default class RNDemoOne extends Component {
render() {
  return (
      <View style={styles.container}>
          <FatherComponent/>
      </View>
  );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},

  sonViewStyle: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      justifyContent: 'center',
      alignItems: 'center',
  },

  fatherViewStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
  },
});