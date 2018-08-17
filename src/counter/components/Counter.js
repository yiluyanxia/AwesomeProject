import React, {Component} from 'react'
import {StyleSheet, View, Text, Button } from 'react-native'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }
  incrementIfOdd() {
    if(this.props.value % 2 !== 0){
      this.props.onIncrement()
    }
  }

  incrementAsync(){
    setTimeout(this.props.onIncrement, 1000)
  }

  render(){
    const { value, onIncrement, onDecrement} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Clicked: {value} times
        </Text>
        <View style={styles.btn}>
          <Button title="+" onPress={onIncrement}/>
        </View>
        <View style={styles.btn}>
          <Button title="-" onPress={onDecrement}/>
        </View>
        <View style={styles.btn}>
          <Button title="Increment if odd" onPress={this.incrementIfOdd}/>
        </View>
        <View style={styles.btn}>
          <Button title=" Increment async" onPress={this.incrementAsync}/>
        </View>
      </View>
    )
  }
}
export default Counter;
const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   backgroundColor: "#efefef",
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    marginTop: 20
  }
}) 